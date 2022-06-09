import { Body, Controller, Get, Post } from '@nestjs/common';
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
    createTask( @Body('title') title: string, @Body('description') description: string): Task{
      return this.tasksServices.createTask(title, description)
    }
}
