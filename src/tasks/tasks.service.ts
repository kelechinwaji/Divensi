import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create.task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.DONE,
    });

    await this.tasksRepository.save(task);
    return task;
  }
  // getAllTask():Task[]{
  //     return this.tasks;
  // }

  // getTaskById(id: string): Task{
  //     const found = this.tasks.find((task) => task.id === id)
  //     if (!found){
  //         throw new  NotFoundException(`Task with ID ${id} not found`)
  //     }
  //     return found
  // }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
  //     const { status, search} = filterDto;
  //     let tasks = this.getAllTask();
  //     if(status){
  //         tasks = tasks.filter((task) => task.status === status)
  //     }
  //     if(search){
  //        tasks = tasks.filter((task)=>{
  //         if (task.title.includes(search) || task.description.includes(search)){
  //             return true;
  //         }

  //         return false
  //        })
  //     }
  //     return tasks;
  // }

  // createTask(createTaskDto: CreateTaskDto):Task{
  //     const {title, description} = createTaskDto
  //     const task:Task = {
  //         id: uuid(),
  //         title,
  //         description,
  //         status: TaskStatus.OPEN
  //     };

  //     this.tasks.push(task);
  //     return task
  // }

  //  updateTaskStatus(id: string, status: TaskStatus){
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task
  //  }

  // deleteTask(id: string): void{
  //     const found = this.getTaskById(id)
  //     this.tasks = this.tasks.filter((task) => task.id !== found.id)
  // }
}
