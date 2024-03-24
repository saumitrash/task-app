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
import { TaskCardProps } from "../../types/task";
import { getStatusColorScheme } from "../../helpers/colorScheme";

const TaskCard = ({ _id, title, description, status }: TaskCardProps) => {
  const navigate = useNavigate();

  // handle delete
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
          <Badge colorScheme={getStatusColorScheme(status)}>{status}</Badge>
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
      <CardFooter justifyContent={"space-between"}>
        <Box>
          <ButtonGroup spacing="2">
            <Button
              size="xs"
              variant="solid"
              colorScheme="blue"
              onClick={() => navigate(`/dashboard/tasks/edit/${_id}`)}
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
        </Box>
        <Box>
          <ButtonGroup spacing="2">
            <Button
              size="xs"
              variant="solid"
              colorScheme="green"
              onClick={() => navigate(`/dashboard/tasks/${_id}`)}
            >
              View
            </Button>
          </ButtonGroup>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
