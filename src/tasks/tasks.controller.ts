import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto):Task[]{
      if(Object.keys(filterDto).length){

      } else{
        return this.tasksServices.getAllTask();  
        
      }
    }

     @Get('/:id')
     getTaskById(@Param('id') id: string): Task{
      return this.tasksServices.getTaskById(id)
     }

    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto): Task{
      return this.tasksServices.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task{
      return this.tasksServices.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
       this.tasksServices.deleteTask(id)
    }

    // new line
}

 