import React from "react";
import Header from "./header";
import LoginBox from "./login-box";
import { Box } from "@chakra-ui/layout";

function Login() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header />
      <LoginBox />
    </Box>
  );
}

export default Login;
