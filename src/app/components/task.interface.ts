export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskType;
}

export type TaskType = 'To Do' | 'In Progress' | 'Done';
