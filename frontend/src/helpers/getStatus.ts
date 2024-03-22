// src/helpers/statusHelper.ts

import { TaskStatus } from "../types/task";

export const getStatus = (status: string): TaskStatus => {
  switch (status) {
    case "To Do":
      return TaskStatus.ToDo;
    case "In Progress":
      return TaskStatus.InProgress;
    case "Done":
      return TaskStatus.Done;
    default:
      return TaskStatus.ToDo;
  }
};
