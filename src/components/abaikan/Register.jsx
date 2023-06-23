import React from "react";
import Header from "../register-page/header";
import { Box } from "@chakra-ui/layout";
import RegisterBox from "../register-page/register-mahasiswa-box";

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
            <RegisterBox/>
        </Box>
    );
}

export default Register;
