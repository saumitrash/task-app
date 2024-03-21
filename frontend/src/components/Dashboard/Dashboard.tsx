import { Box, Button, Heading } from "@chakra-ui/react";
import TaskGrid from "./TaskGrid";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/dashboard/tasks/add");
  };

  useEffect(() => {
    apiClient.get("/auth/me").then((response) => {
      setUsername(response.data.username);
    });
  });

  // TODO: add function to filter tasks by status

  return (
    <Box>
      <Heading as="h1" size="xl" mb={10}>
        Dashboard
      </Heading>
      {/* TODO: add a logout button */}
      <Heading as="h2" size="lg" mb={10}>
        Hi, {username}!
      </Heading>
      <Button colorScheme="green" size="lg" onClick={handleAdd}>
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
