import { useToast } from "@chakra-ui/react";

const useToastMessages = () => {
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

  return { showError, showSuccess };
};

export default useToastMessages;
