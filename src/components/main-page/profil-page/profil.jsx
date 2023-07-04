import React from "react";
import Header from "../components/header-dashboard";
import TitlePage from "../components/title-page"
import BreadcrumbProfile from "./components/breadcrumb-profile";
import img from "../../../assets/icon-profile.svg"
//role
import Lihat from "./components/lihat";
import {
    Box,
    Flex,
    Spacer,
}
    from '@chakra-ui/react'

function Profil() {

    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            w="100%"
            bgRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundColor="#f4f8fa"
        >


            <Header page="2" />
            <Box mx="6.3%">
                <Flex py="24px" >
                    <TitlePage title="Profile" desc="Berfungsi untuk melengkapi data profil" imgsrc={img} />
                    <Spacer></Spacer>
                    <BreadcrumbProfile />
                </Flex>
                <Lihat userCode={1} />
            </Box>
        </Box >
    );
}

export default Profil;