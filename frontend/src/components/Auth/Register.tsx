import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Navigate,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import apiClient from "../../services/api-client";

// TODO: Verify working of register page

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  // TODO: Extract this logic into a custom hook
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    apiClient
      .get("/auth/verify-token")
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  const toast = useToast();

  // TODO: Extract this logic into a custom hook
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);

    try {
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
