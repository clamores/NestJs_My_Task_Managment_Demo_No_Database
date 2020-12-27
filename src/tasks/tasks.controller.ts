import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { getTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

@Get()
getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDto): task[] {
    if(Object.keys(filterDto).length){
        return this.taskService.getTasksWithFilters(filterDto);
    }else {
        return this.taskService.getAllTasks();
    }

}

@Get('/:id')
getTaskById(@Param('id') id: string): task {
return this.taskService.getTaskById(id);
}

@Post()
@UsePipes(ValidationPipe)
createTask(@Body() createTaskDto: CreateTaskDto) {
return this.taskService.createTask(createTaskDto);
}

@Delete('/:id')
deleteTask(@Param('id') id: string): void{
 this.taskService.deleteTask(id);
}

@Patch(':id/status')
updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
): task{
    return this.taskService.updateTaskStatus(id,status);
}

}
