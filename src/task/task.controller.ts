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
import { FindAllParameters, TaksRouteParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }

  @Put('/:id')
  async update(
    @Param() params: TaksRouteParameters,
    @Body() task: TaskDto,
  ): Promise<void> {
    await this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  async delete(@Param() params: TaksRouteParameters): Promise<string> {
    return this.taskService.delete(params.id);
  }
}
