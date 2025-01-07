import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks: Array<Task> = []

  getTasks(): Array<Task> {

    this.tasks = this.getFromLocalStorage();
    
    return this.tasks;
  }

  getById(id: number): Task | undefined {

    const task = this.tasks.find(c => c.id === id);

    return task;
  }

  addTask(task: Task) {

    this.tasks.push(task);

    this.saveToLocalStorage();
  }

  updateTask() {

    this.saveToLocalStorage();
  }

  removeTask(task: Task) {

    const index = this.tasks.indexOf(task);

    if (index !== -1) {
      //achou
      this.tasks.splice(index, 1);

      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {

    const taskJSON = JSON.stringify(this.tasks);

    localStorage.setItem('tasks', taskJSON);
  }

  private getFromLocalStorage(): Array<Task> {

    const taskJSON = localStorage.getItem('tasks');

    if (!taskJSON) {
      //não achou
      return new Array<Task>();

    }

    return JSON.parse(taskJSON);
  }
}
