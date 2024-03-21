import { Box, Button, Heading } from "@chakra-ui/react";
import TaskGrid from "./TaskGrid";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    apiClient.get("/auth/me").then((response) => {
      setUsername(response.data.username);
    });
  });

  return (
    <Box>
      <Heading as="h1" size="xl" mb={10}>
        Dashboard
      </Heading>
      <Heading as="h2" size="lg" mb={10}>
        Hi, {username}!
      </Heading>
      <Button colorScheme="green" size="lg">
        Add Task
      </Button>
      <Box mt={10}>
        <Heading size="lg" mb={5}>
          My Tasks
        </Heading>
        <Box>
          <TaskGrid />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
