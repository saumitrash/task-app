export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

export interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
