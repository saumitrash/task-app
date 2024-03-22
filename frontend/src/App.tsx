import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box padding={10}>
      <Outlet />
    </Box>
  );
}

export default App;
