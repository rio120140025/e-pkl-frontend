import React, { useEffect, useState } from "react";
import Header from "../components/header-dashboard";
import TitlePage from "../components/title-page";
import BreadcrumbProfile from "./components/breadcrumb-profile";
import img from "../../../assets/icon-profile.svg";
import Lihat from "./components/lihat";
import { Box, Flex, Spacer } from "@chakra-ui/react";



function Profil() {
    const roles_id = localStorage.getItem('roles_id');


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
                <Flex py="24px">
                    <TitlePage
                        title="Profile"
                        desc="Berfungsi untuk melengkapi data profil"
                        imgsrc={img}
                    />
                    <Spacer></Spacer>
                    <BreadcrumbProfile />
                </Flex>
                <Lihat roles_id={roles_id} />
            </Box>
        </Box>
    );
}

export default Profil;