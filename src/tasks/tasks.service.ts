import {v4 as uuid} from 'uuid'
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTask():Task[]{
        return this.tasks; 
    }

    getTaskById(id: string): Task{
        const found = this.tasks.find((task) => task.id === id)
        if (!found){
            throw new  NotFoundException(`Task with ID ${id} not found`)
        }
        return found
    }

    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
        const { status, search} = filterDto;
        let tasks = this.getAllTask();
        if(status){
            tasks = tasks.filter((task) => task.status === status)
        }
        if(search){
           tasks = tasks.filter((task)=>{
            if (task.title.includes(search) || task.description.includes(search)){
                return true;
            }

            return false
           }) 
        }
        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto):Task{
        const {title, description} = createTaskDto
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task
    }

     updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task
     }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }
}
 class  validService{}