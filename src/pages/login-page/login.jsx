import React from "react";

import LoginBox from "./pages/login-box";
import Header from "./components/header";

import { Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

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
      <LoginBox>
        <Link to="/dashboard" />
      </LoginBox>
    </Box>
  );
}

export default Login;
