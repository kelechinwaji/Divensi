import {v4 as uuid} from 'uuid'
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTask():Task[]{
        return this.tasks; 
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
}
