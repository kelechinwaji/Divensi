import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsString()
    @IsOptional()
    search?: string
}