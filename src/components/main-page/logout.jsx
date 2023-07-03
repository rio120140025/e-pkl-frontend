import React from "react";
import Header from "./components/header-dashboard";
import {
    Box,
    Flex,
    Spacer,
    SimpleGrid,
    useToast,
    Button
}
    from '@chakra-ui/react'

import axios from "axios";
import { useCookies } from 'react-cookie';

import { useNavigate } from "react-router-dom";
function Logout() {
    const toast = useToast()
    function callToast(title, status) {
        toast({
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        let token = "72|qAqzKHtdDEqkPxR8I2gqWkMogde5wWI9HVidMWds"
        axios
            .post("http://127.0.0.1:8000/api/user/logout", token)
            .then(response => {
                callToast("Logout Berhasil", 'success')
                navigate('/')
            })
            .catch(error => {
                console.error(error.response);
                callToast("Gagal Logout", 'error')
            });
    };

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
            <Header page="8" />
            <Button onClick={handleLogout}>Logout</Button>
        </Box>

    )
}

export default Logout