import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(task: TaskDto): Promise<TaskDto> {
    const taskToSave: TaskEntity = {
      title: task.title,
      description: task.description,
      status: TaskStatusEnum.TO_DO,
      expirationDate: task.expirationDate,
    };

    const createdTask = await this.taskRepository.save(taskToSave);

    return this.mapEntityToDto(createdTask);
  }

  async findById(id: string): Promise<TaskDto> {
    const foundTask = await this.taskRepository.find({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundTask[0]);
  }

  async findAll(params: FindAllParameters): Promise<TaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchParams.status = Like(`%${params.status}%`);
    }

    const tasksFound = await this.taskRepository.find({
      where: searchParams,
    });

    return tasksFound.map((task) => this.mapEntityToDto(task));
  }

  async update(id: string, task: TaskDto): Promise<void> {
    const foundTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.taskRepository.update({ id }, this.mapDtoToEntity(task));
  }

  async delete(id: string): Promise<string> {
    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return `Task with ID ${id} deleted`;
  }

  private mapEntityToDto(task: TaskEntity): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: TaskStatusEnum[task.status],
      expirationDate: task.expirationDate,
    };
  }

  private mapDtoToEntity(task: TaskDto): Partial<TaskEntity> {
    return {
      title: task.title,
      description: task.description,
      status: task.status.toString(),
      expirationDate: task.expirationDate,
    };
  }
}
