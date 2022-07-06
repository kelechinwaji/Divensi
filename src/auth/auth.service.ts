import * as bcrypt from "bcrypt"
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
