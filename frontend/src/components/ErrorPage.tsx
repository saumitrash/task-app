import { Center, Flex, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Heading>Error 404: Page not found</Heading>
      </Center>
    </Flex>
  );
};

export default ErrorPage;
