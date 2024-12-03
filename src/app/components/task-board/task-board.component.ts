import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../task.interface';

@Component({
  selector: 'task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  statuses: string[] = ['To Do', 'In Progress', 'Done'];

  constructor (private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  onDrop(event: CdkDragDrop<Task[]>, newStatus: string): void {
    const task = event.item.data;
    if (task.status !== newStatus) {
      this.taskService.updateTaskStatus(task.id, newStatus);
      task.status = newStatus;
    }
  }
}
