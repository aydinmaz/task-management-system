import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { Task } from '../task.interface';


@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent {
  @Input() task!: Task;
  isEditing = false;

  constructor (private readonly taskService: TaskService) { }

  saveTask(): void {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.isEditing = false;
    });
  }
}
