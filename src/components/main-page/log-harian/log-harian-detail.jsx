import React from "react";
import Header from "../components/header-dashboard";
import Title from "../components/title-page";
import img from "../../../assets/icon-log-harian.svg"
import {
    Box,
    Flex,
    Spacer

}
    from '@chakra-ui/react'
import BreadcrumbLogharian from "./components/breadcrumb-log-harian";
import LogHarianBox from "./components/log-harian-box";

function LogHarianDetail() {

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
            <Header page="4" />
            <Box mx="6.3%">
                <Flex py="24px">
                    <Title title="Log Harian" desc="Berfungsi untuk melihat data log harian mahasiswa" imgsrc={img} />
                    <Spacer></Spacer>
                    <BreadcrumbLogharian detail="yes" />
                </Flex>
                <LogHarianBox detail="yes" />
            </Box>
        </Box>
    );
}


export default LogHarianDetail;

