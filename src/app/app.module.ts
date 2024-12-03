import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [AppComponent,
    TaskBoardComponent,
    DashboardComponent,
    TaskListComponent,
    TaskDetailComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DragDropModule,
    MatCardModule,
    FormsModule,
    FormsModule,
    CommonModule,
    QuillModule.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule { }
