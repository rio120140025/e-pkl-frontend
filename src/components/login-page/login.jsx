import React from "react";

import LoginBox from "./components/login-box";
import Header from "./components/header";
import { Box } from "@chakra-ui/react";
import backgroud from "../../assets/background.jpg"

function Login() {
  return (
    <Box
      backgroundImage={backgroud}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover">
      <Header />
      <LoginBox />
    </Box>
  );
}

export default Login;
