import { Badge, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskCard, { TaskCardProps, TaskStatus } from "./TaskCard";
import apiClient from "../../services/api-client";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const [task, setTask] = useState<TaskCardProps>();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get<TaskCardProps>(`/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Heading as="h1" size="xl" mb={10}>
        {task?.title || "Task"}
      </Heading>
      <Badge colorScheme="yellow">{task?.status || TaskStatus.ToDo}</Badge>
      <Text>{task?.description || "Desc..."}</Text>
    </>
  );
};

export default TaskDetail;
