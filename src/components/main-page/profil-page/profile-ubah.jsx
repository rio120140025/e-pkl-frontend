import React from "react";
import Header from "../components/header-dashboard";
import TitlePage from "../components/title-page"
import BreadcrumbProfileUbah from "./components/breadcrumb-profile-ubah";
import img from "../../../assets/icon-profile.svg"
import Ubah from "./components/ubah";
import {
    Box,
    Flex,
    Spacer,
}
    from '@chakra-ui/react'
import GetDataUser from "../get-data-user";
import { emailLogin } from "../../login-page/components/login-box";



function ProfilUbah(props) {
    const { roles_idUser } = GetDataUser(emailLogin);
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
                    <BreadcrumbProfileUbah />
                </Flex>
                <Ubah userCode={roles_idUser} />
            </Box>
        </Box >
    );
}

export default ProfilUbah;
