import {
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import apiClient from "../../services/api-client";

import { TaskCardProps, TaskStatus } from "../../types/task";
import { getStatus } from "../../helpers/getStatus";

const AddTaskPage = () => {
  const [task, setTask] = useState<TaskCardProps>({
    _id: "",
    title: "New Task",
    description: "New Description",
    status: TaskStatus.ToDo,
  });
  const navigate = useNavigate();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    apiClient
      .post<TaskCardProps>("/tasks/", task)
      .then((response) => {
        setTask(response.data);
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={task?.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </FormControl>
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <Select
            value={task?.status}
            onChange={(e) =>
              setTask({ ...task, status: getStatus(e.target.value) })
            }
          >
            <option value={TaskStatus.ToDo}>To Do</option>
            <option value={TaskStatus.InProgress}>In Progress</option>
            <option value={TaskStatus.Done}>Done</option>
          </Select>
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={task?.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </FormControl>

        <Button type="submit" mt={5} colorScheme="green">
          Save
        </Button>
      </form>
      <VStack mt={10} alignItems="start">
        <Link textDecoration="underline" as={RouterLink} to={`/dashboard`}>
          Back to dashboard
        </Link>
      </VStack>
    </>
  );
};

export default AddTaskPage;
