import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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

  @Get()
  findAll(@Query() params: FindAllParameters): TaskDto[] {
    return this.taskService.findAll(params);
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
