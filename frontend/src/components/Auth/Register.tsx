import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import useAuthentication from "../../hooks/useAuthentication";
import useToastMessages from "../../hooks/useToastMessages";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showError, showSuccess } = useToastMessages();

  const { loading, authenticated } = useAuthentication();

  // TODO: extract this logic into a hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: add this logic inside APIClient class
      const response = await apiClient.post("/auth/register", {
        username,
        password,
      });
      if (response.status !== 200) {
        throw new Error("Registration failed");
      }

      showSuccess("Registration successful. Please login to continue!");
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      setError("Incorrect details");
      setUsername("");
      setPassword("");
      showError(err.message);
      // back to same page
      navigate("/register", { replace: true });
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
          Register
        </Heading>
        {/* TODO: add field for error */}
        {/* TODO: extract form to a separate component */}
        <form onSubmit={handleSubmit}>
          <FormControl id="username" mt={4}>
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
            Register
          </Button>
        </form>
        <Box mt={4}>
          Already have an account?{" "}
          <Link textDecoration="underline" as={RouterLink} to="/login">
            Log in
          </Link>
        </Box>
      </Box>
    );
  }
};

export default Register;
