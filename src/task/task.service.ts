import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
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
