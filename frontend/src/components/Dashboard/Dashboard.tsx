import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import TaskGrid from "./TaskGrid";

const Dashboard = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={10}>
        Dashboard
      </Heading>
      <Heading as="h2" size="lg" mb={10}>
        Hi, User!
      </Heading>
      <Button colorScheme="green" size="lg">
        Add Task
      </Button>
      <Box mt={10}>
        <Heading size="lg" mb={5}>
          My Tasks
        </Heading>
        <Box padding={5}>
          <TaskGrid />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
