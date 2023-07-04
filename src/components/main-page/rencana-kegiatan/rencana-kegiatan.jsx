import React from "react";
import Header from "../components/header-dashboard";
import Title from "../components/title-page";
import TableRencanaKegiatan from "./components/table";
import img from "../../../assets/icon-rencana-kegiatan.svg"
import {
    Box,
    Flex,

}
    from '@chakra-ui/react'


function RencanaKegiatan() {
    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            w="100%"
            bgRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundColor="#f4f8fa">

            <Header page="3" />
            <Flex direction="column" gap="12px" py="24px" mx="6.3%">
                <Title title="Rencana Kegiatan" desc="Berfungsi untuk melihat rencana kegiatan mahasiswa PKL" imgsrc={img} />
                <Box>
                    <TableRencanaKegiatan />
                </Box>
            </Flex>
        </Box>
    );
}

export default RencanaKegiatan;
