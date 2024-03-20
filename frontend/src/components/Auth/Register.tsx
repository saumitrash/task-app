import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  return (
    <Box p={3}>
      <Heading size="lg" mb={10}>
        Register
      </Heading>

      <FormControl id="username" mt={4}>
        <FormLabel>Username</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="password" mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Register
      </Button>
      <Box mt={4}>
        Already have an account?{" "}
        <Link textDecoration="underline" as={RouterLink} to="/login">
          Log in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
