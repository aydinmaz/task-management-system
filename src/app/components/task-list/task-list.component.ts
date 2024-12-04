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
  isLoading = true;
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];

  // Filtering and sorting
  filterText: string = '';
  sortField: string = 'title'; // Default sorting field
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sorting order

  constructor (
    private readonly taskService: TaskService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.isLoading = false;
      this.tasksToDo = this.filterAndSortTasks(
        tasks.filter((task) => task.status === 'To Do')
      );
      this.tasksInProgress = this.filterAndSortTasks(
        tasks.filter((task) => task.status === 'In Progress')
      );
      this.tasksDone = this.filterAndSortTasks(
        tasks.filter((task) => task.status === 'Done')
      );
    });
  }

  filterAndSortTasks(tasks: Task[]): Task[] {
    // Filter tasks
    let filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.filterText.toLowerCase())
    );

    // Sort tasks
    return filteredTasks.sort((a, b) => {
      const fieldA = a[this.sortField as keyof Task];
      const fieldB = b[this.sortField as keyof Task];
      if (fieldA < fieldB) return this.sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  deleteTask(id: number): void {
    this.isLoading = true;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
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

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
