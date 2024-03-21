import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { TaskCardProps } from "./TaskCard";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

// const tasks: TaskCardProps[] = [
//   { title: "Task 1", description: "Description 1", status: TaskStatus.ToDo },
//   { title: "Task 2", description: "Description 2", status: TaskStatus.Done },
//   {
//     title: "Task 3",
//     description: "Description 3",
//     status: TaskStatus.InProgress,
//   },
//   {
//     title: "Task 4",
//     description: "Description 4",
//     status: TaskStatus.InProgress,
//   },
//   {
//     title: "Task 5",
//     description: "Description 5",
//     status: TaskStatus.InProgress,
//   },
//   {
//     title: "Task 6",
//     description: "Description 6",
//     status: TaskStatus.Done,
//   },
// ];

const TaskGrid = () => {
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    apiClient.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {tasks.map((task, index) => (
        <GridItem key={index}>
          <TaskCard
            _id={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TaskGrid;
