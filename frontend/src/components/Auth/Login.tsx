import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import useAuthentication from "../../hooks/useAuthentication";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authenticated, loading } = useAuthentication();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const showError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // TODO: extract this logic into a hook
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: add this logic inside APIClient class
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const token = response.data.token;

      localStorage.setItem("token", token);

      // Handle successful login here, e.g. redirecting to another page
      navigate("/dashboard");

      showSuccess("Login successful!");
    } catch (err) {
      // If there's an error, set the error state
      setError(err.message);
      setUsername("");
      setPassword("");
      navigate("/login", { replace: true });
      showError("Incorrect details. Try again!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Box p={3}>
        <Heading size="lg" mb={10}>
          Log In
        </Heading>
        {/* TODO: add field for error */}
        {/* TODO: extract form to a separate component */}
        <form onSubmit={handleLogin}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Login
          </Button>
        </form>
        <Box mt={4}>
          Don't have an account?{" "}
          <Link textDecoration="underline" as={RouterLink} to="/register">
            Register
          </Link>
        </Box>
      </Box>
    );
  }
};

export default Login;
