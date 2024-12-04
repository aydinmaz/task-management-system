import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [
    TaskBoardComponent,
    DashboardComponent,
    TaskListComponent,
    TaskDetailComponent,
    AppComponent,
  ],
  imports: [
    CommonModule, RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatCardModule,
    FormsModule,
    FormsModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    QuillModule.forRoot()],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()]
})
export class AppModule { }
