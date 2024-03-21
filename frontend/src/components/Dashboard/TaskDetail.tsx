import { Badge, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TaskCardProps, TaskStatus } from "./TaskCard";
import apiClient from "../../services/api-client";
import { Link as RouterLink, useParams } from "react-router-dom";

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
  }, [id]);
  return (
    <>
      <Heading as="h1" size="xl" mb={10}>
        {task?.title || "Task"}
      </Heading>
      <Badge colorScheme="yellow">{task?.status || TaskStatus.ToDo}</Badge>
      <Text>{task?.description || "Desc..."}</Text>

      <VStack mt={10} alignItems="start">
        <Link
          textDecoration="underline"
          as={RouterLink}
          to={`/dashboard/tasks/edit/${id}`}
        >
          Edit
        </Link>
        <Link textDecoration="underline" as={RouterLink} to={`/dashboard`}>
          Back to dashboard
        </Link>
      </VStack>
    </>
  );
};

export default TaskDetail;
