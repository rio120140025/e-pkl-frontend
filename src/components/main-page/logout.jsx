import React from "react";
import Header from "./components/header-dashboard";
import { useCookies } from 'react-cookie';
import { Box, useToast, Button, Text } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailLogin } from "../login-page/components/login-box";

function Logout() {
    const toast = useToast();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const navigate = useNavigate();


    function callToast(title, status) {
        toast({
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        });
    }

    const handleLogout = () => {
        console.log(cookies.jwt_token.data);
        axios
            .post("http://127.0.0.1:8000/api/user/logout", null, {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                callToast("Logout Berhasil", 'success');
                removeCookie('jwt_token')
                navigate('/');
            })
            .catch(error => {
                console.error(error.response);
                callToast("Gagal Logout", 'error');
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