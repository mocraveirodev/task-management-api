import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() task: TaskDto): TaskDto {
    return this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() task: TaskDto): TaskDto {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return this.taskService.delete(id);
  }
}
