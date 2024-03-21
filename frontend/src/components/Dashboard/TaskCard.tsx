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

export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

export interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
}

const TaskCard = ({ title, description, status }: TaskCardProps) => {
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
          <Button size="xs" variant="solid" colorScheme="blue">
            Edit
          </Button>
          <Button size="xs" variant="solid" colorScheme="red">
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
