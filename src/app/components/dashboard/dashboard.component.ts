import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../task.interface';


@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskStats = { toDo: 0, inProgress: 0, done: 0 };
  isLoading = false;

  constructor (private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe((tasks: any) => {
      this.isLoading = false;
      this.taskStats = {
        toDo: tasks.filter((task: Task) => task.status === 'To Do').length,
        inProgress: tasks.filter((task: Task) => task.status === 'In Progress').length,
        done: tasks.filter((task: Task) => task.status === 'Done').length,
      };
    });
  }
}
