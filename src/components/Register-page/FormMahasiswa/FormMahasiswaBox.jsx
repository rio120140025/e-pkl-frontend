import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import {
    Box,
    Button,

} from "@chakra-ui/react";
import "./FormMahasiswaBox.css";
import InputBox from "./input-box";
import PasswordInput from "./password";



function CardBox() {
    return (
        <Center>
            <AbsoluteCenter>
                <Box className="box" maxW="sm" p="25px">
                    <SimpleGrid spacingY="13px">
                        <Box>
                            Nama
                            <InputBox />
                        </Box>
                        <Box>
                            Email
                            <InputBox />
                        </Box>
                        <Box>
                            NIM
                            <InputBox />
                        </Box>
                        <Box>
                            Lokasi PKL
                            <InputBox />
                        </Box>
                        <Box>
                            Nomor Telpon
                            <InputBox />
                        </Box>
                        <Box>
                            Password
                            <PasswordInput />
                        </Box>
                        <Box pb='20px'>
                            <Button className="button-box" >Sign Up</Button>
                        </Box>
                    </SimpleGrid>
                </Box>
            </AbsoluteCenter >
        </Center >
    );
}
export default CardBox;
