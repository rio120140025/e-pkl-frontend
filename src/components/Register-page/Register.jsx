import React from "react";
import Header from "./Header";
import RegisterRole from "./RegisterRole.jsx";
import { Box } from "@chakra-ui/layout";


function Register() {
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
            <RegisterRole />
        </Box>
    );
}

export default Register;
