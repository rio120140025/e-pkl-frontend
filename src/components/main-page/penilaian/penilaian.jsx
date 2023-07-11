import React, { useEffect, useState } from "react";
import Header from "../components/header-dashboard";
import TitlePage from "../components/title-page";
import BreadcrumbPenilaian from "./components/breadcrumb-penilaian";
import img from "../../../assets/icon-penilaian-pkl.svg";
import PenilaianBox from "./components/penilaian-box";

import { Box, Flex, Spacer } from "@chakra-ui/react";



function Penilaian() {
    const roles_id = localStorage.getItem('roles_id');

    return (
        <Box
            height={"100%"}
            width={"100%"}
            w="100%"
            bgRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundColor="#f4f8fa"
        >
            <Header page="5" />
            <Box mx="6.3%">
                <Flex py="24px">
                    <TitlePage
                        title="Penilaian PKL"
                        desc="Berfungsi untuk melihat data penilaian mahasiswa PKL"
                        imgsrc={img}
                    />
                    <Spacer></Spacer>
                    <BreadcrumbPenilaian />
                </Flex>
                <PenilaianBox />
            </Box>
        </Box>
    );
}

export default Penilaian;