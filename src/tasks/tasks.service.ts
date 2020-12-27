import { Injectable, NotFoundException } from '@nestjs/common';
import { task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { getTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    private tasks: task[] = [];

    getAllTasks(): task[] {
        return this.tasks;
    }


    getTasksWithFilters(filterDto: getTasksFilterDto):task[] {
    const {status, search}= filterDto;
    
    let tasks = this.getAllTasks();

    if(status) {
    tasks = tasks.filter(task =>task.status === status);
    }
    if(search) {
    tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search),
     );
    }
    return tasks;
    }


    getTaskById(id: string): task {
    const found = this.tasks.find(task => task.id === id)
    
    if(!found){
      throw new NotFoundException(`task with ID "${id}"not found `);
    }
    return found;
    }


    createTask(createTaskDto: CreateTaskDto): task {
        const {title, description} = createTaskDto;

        const task: task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !==found.id)
    }


    updateTaskStatus(id: string, status: TaskStatus): task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}