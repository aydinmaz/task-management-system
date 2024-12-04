import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../task.interface';

@Component({
  standalone: false,
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isLoading = false;
  taskForm!: FormGroup;
  taskId = 0;
  title = 'Add Task';
  constructor (
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly taskService: TaskService
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    const taskId = this.taskId
    if (taskId) {
      this.isLoading = true;
      this.title = 'Edit Task';
      this.getTask(taskId);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    } else {
      this.getAllTasks();
    }
  }

  getTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(task => {
      this.taskForm = this.fb.group({
        title: [task.title, Validators.required],
        description: [task.description, Validators.required],
        status: [task.status, Validators.required]
      });
    });
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
      this.taskForm.patchValue({ id: maxId + 1 }); // Assign a new ID
    });
  }



  initForm = (): void => {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],

    });
  };


  onSave(): void {
    if (this.taskForm.valid) {
      if (this.taskId) {
        const updatedTask = { ...this.taskForm.value, id: this.taskId };
        this.taskService.updateTask(updatedTask).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        const newTask = { ...this.taskForm.value }; // ID will be set automatically
        this.taskService.addTask(newTask).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }



  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
