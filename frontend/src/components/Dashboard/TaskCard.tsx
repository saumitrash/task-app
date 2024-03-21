import {
  Box,
  Badge,
  Text,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";

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

const TaskCard = ({ _id, title, description, status }: TaskCardProps) => {
  const navigate = useNavigate();
  // TODO: Extract this logic to a helper function
  let statusColorScheme: string;
  switch (status) {
    case "To Do":
      statusColorScheme = "yellow";
      break;
    case "In Progress":
      statusColorScheme = "blue";
      break;
    case "Done":
      statusColorScheme = "green";
      break;
    default:
      statusColorScheme = "gray";
  }

  // handle delete
  // TODO: Consider using a modal to confirm the delete action
  const handleDelete = () => {
    apiClient
      .delete(`/tasks/${_id}`)
      .then((response) => {
        console.log(response);
        navigate(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card>
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="md">{title}</Heading>
          <Badge colorScheme={statusColorScheme}>{status}</Badge>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text pt="2" fontSize="sm">
              {description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            size="xs"
            variant="solid"
            colorScheme="blue"
            onClick={(e) => navigate(`/dashboard/tasks/edit/${_id}`)}
          >
            Edit
          </Button>
          <Button
            size="xs"
            variant="solid"
            colorScheme="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
