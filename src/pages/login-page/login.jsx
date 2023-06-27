import React from "react";

import LoginBox from "./components/login-box";
import Header from "./components/header";

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
