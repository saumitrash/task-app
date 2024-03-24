import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import TaskGrid from "./TaskGrid";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TaskCardProps } from "../../types/task";
import { getStatus } from "../../helpers/getStatus";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [filter, setFilter] = useState("All tasks"); // ["All tasks", "To Do", "In Progress", "Done"]
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);

  const navigate = useNavigate();

  // write useEffect to fetch tasks
  useEffect(() => {
    apiClient
      .get<TaskCardProps[]>("/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAdd = () => {
    navigate("/dashboard/tasks/add");
  };

  useEffect(() => {
    apiClient.get("/auth/me").then((response) => {
      setUsername(response.data.username);
    });
  });

  // a function to filter tasks by status
  const filterTasks = (status: string) => {
    if (status === "All tasks") {
      return tasks;
    }
    return tasks.filter((task) => task.status === getStatus(status));
  };

  // handle logout
  const handleLogout = () => {
    apiClient.post("/auth/logout").then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <Box>
      <HStack mb={10} justifyContent="space-between">
        <Heading as="h1" size="xl">
          Dashboard
        </Heading>
        <Button colorScheme="gray" size="lg" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>

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

        <Menu>
          Filter by:{" "}
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {filter}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setFilter("All tasks")}>
              All tasks
            </MenuItem>
            <MenuItem onClick={() => setFilter("To Do")}>To Do</MenuItem>
            <MenuItem onClick={() => setFilter("In Progress")}>
              In Progress
            </MenuItem>
            <MenuItem onClick={() => setFilter("Done")}>Done</MenuItem>
          </MenuList>
        </Menu>

        <Divider mt={2} colorScheme="gray" />
        <Box mt={10}>
          <TaskGrid tasks={filterTasks(filter)} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
