import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;
    this.tasks.push(task);
    return task;
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    // throw new NotFoundException(`Task with ID ${id} not found`);

    throw new HttpException(
      `Task with ID ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    const { title, status } = params;
    const foundTasks = this.tasks.filter((task) => {
      if (title && !task.title.includes(title)) {
        return false;
      }

      if (status && !task.status.includes(status)) {
        return false;
      }

      return true;
    });

    if (foundTasks.length) {
      return foundTasks;
    }

    throw new HttpException(`Tasks not found`, HttpStatus.NOT_FOUND);
  }

  update(id: string, task: TaskDto) {
    const foundIndex = this.tasks.findIndex((task) => task.id === id);

    if (foundIndex >= 0) {
      this.tasks[foundIndex] = { id, ...task };

      return this.tasks[foundIndex];
    }

    throw new HttpException(
      `Task with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  delete(id: string) {
    const foundIndex = this.tasks.findIndex((task) => task.id === id);

    if (foundIndex >= 0) {
      this.tasks.splice(foundIndex, 1);

      return 'Task deleted successfully';
    }

    throw new HttpException(
      `Task with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
