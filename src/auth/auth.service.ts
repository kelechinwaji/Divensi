import * as bcrypt from "bcrypt"
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import { JwtService } from "@nestjs/jwt";
import { jwtPayload } from "./jwt-payload-interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.userRepository.create({
      username,
      password: hashedPassword
    });

    try {
        await this.userRepository.save(user);
        
    } catch (error) {
        if(error.code === '23505'){
            // duplicate username
            throw new ConflictException('Username already exist')
        } else{
            throw new InternalServerErrorException()
        }
        
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: String}>{
    const {username, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({where: { username: username }});
    if(user && ( await bcrypt.compare(password, user.password))){
        const payload: jwtPayload = {username};
        const accessToken: string = await this.jwtService.sign(payload)
        return {accessToken};
    } else{
        throw new UnauthorizedException('Please check your login details')
    }
  }
}
