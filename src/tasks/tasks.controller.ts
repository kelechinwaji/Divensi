import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService){}

    @Get()
    getAllTask():Task[]{
      return this.tasksServices.getAllTask();  
    }

    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto): Task{
      return this.tasksServices.createTask(createTaskDto)
    }
}

 