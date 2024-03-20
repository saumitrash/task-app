import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <Box p={3}>
      <Heading size="lg" mb={10}>
        Log In
      </Heading>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="password" mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Login
      </Button>
      <Box mt={4}>
        Don't have an account?{" "}
        <Link textDecoration="underline" as={RouterLink} to="/register">
          Register
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
