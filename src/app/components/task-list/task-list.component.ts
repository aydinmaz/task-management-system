import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../task.interface';



@Component({
  standalone: false,
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  // tasks: Task[] = [];
  isLoading = true;
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];

  constructor (private readonly taskService: TaskService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.isLoading = false;
      this.tasksToDo = tasks.filter((task) => task.status === 'To Do');
      this.tasksInProgress = tasks.filter((task) => task.status === 'In Progress');
      this.tasksDone = tasks.filter((task) => task.status === 'Done');
    });
  }

  deleteTask(id: number): void {
    this.isLoading = true;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks()
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  editTask(id: number) {
    this.router.navigate(['tasks', id]);
  }


  onDrop(event: any): void {
    if (event.previousContainer === event.container) {
      return; // Task was dropped in the same column
    }

    const task = event.previousContainer.data[event.previousIndex];
    const newStatus = this.getStatusFromContainerId(event.container.id);

    task.status = newStatus;
    this.taskService.updateTask(task).subscribe(() => {
      event.previousContainer.data.splice(event.previousIndex, 1);
      event.container.data.splice(event.currentIndex, 0, task);
    });
  }

  getStatusFromContainerId(containerId: string): string {
    switch (containerId) {
      case 'ToDo':
        return 'To Do';
      case 'InProgress':
        return 'In Progress';
      case 'Done':
        return 'Done';
      default:
        return '';
    }
  }
}
