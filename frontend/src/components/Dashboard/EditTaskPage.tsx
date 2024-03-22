import {
  FormControl,
  Button,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import apiClient from "../../services/api-client";
import { TaskCardProps, TaskStatus } from "./TaskCard";

// TODO: form validation

const EditTaskPage = () => {
  const [task, setTask] = useState<TaskCardProps>({
    _id: "",
    title: "New Task",
    description: "New Description",
    status: TaskStatus.ToDo,
  });
  const navigate = useNavigate();

  const { id } = useParams();

  const getStatus = (status: string) => {
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

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    apiClient
      .put<TaskCardProps>(`/tasks/${id}`, task)
      .then((response) => {
        setTask(response.data);
        navigate(`/dashboard/tasks/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
      <form onSubmit={handleEdit}>
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

        <Button type="submit" mt={5}>
          Save
        </Button>
      </form>
      <VStack mt={10} alignItems="start">
        <Link
          textDecoration="underline"
          as={RouterLink}
          to={`/dashboard/tasks/${id}`}
        >
          Go to readonly mode
        </Link>
        <Link textDecoration="underline" as={RouterLink} to={`/dashboard`}>
          Back to dashboard
        </Link>
      </VStack>
    </>
  );
};

export default EditTaskPage;
