import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Task } from '../components/task.interface';



@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  tasks: Task[] = [];
  isLoading = true;



  constructor (private readonly http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(delay(1500)); // Fake delay
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => {
        const task = tasks.find((task) => task.id == id);
        if (!task) {
          throw new Error(`Task with ID ${id} not found`);
        }
        return task;
      })
    );
  }


  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTaskStatus(taskId: number, newStatus: any): void {
    this.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.isLoading = false;
    });
    const task = this.tasks.find((t) => t.id == taskId);
    if (task) task.status = newStatus;
  }
}
