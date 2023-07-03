import React from "react";
import Header from "./components/header";
import RoleBox from "./components/register-role";
import RegisterBoxMahasiswa from "./components/register-mahasiswa-box";
import RegisterBoxDosen from "./components/register-dosen-box";
import RegisterBoxDPL from "./components/register-dpl-box";
import { Box } from "@chakra-ui/react";
import backgroud from "../../assets/background.jpg"
function RoleRegister() {
    return (
        <Box
            backgroundImage={backgroud}
            height={"100vh"}
            width={"100vw"}
            w="100%"
            bgRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
        >
            <Header />
            <RoleBox />
        </Box>
    );
}

function RoleRegisterMahasiswa() {
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
            <RegisterBoxMahasiswa />
        </Box>
    );
}

function RoleRegisterDosen() {
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
            <RegisterBoxDosen />
        </Box>
    );
}

function RoleRegisterDPL() {
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
            <RegisterBoxDPL />
        </Box>
    );
}

export {
    RoleRegister,
    RoleRegisterDPL,
    RoleRegisterDosen,
    RoleRegisterMahasiswa,
};