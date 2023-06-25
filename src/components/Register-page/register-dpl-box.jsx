import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import "../login-page/box.css";
import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";
import { ButtonBoxSignUp } from "../login-page/button-box";
import Header from '../login-page/header'

function RegisterBox() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header></Header>
      <Center>
        <AbsoluteCenter>
          <Box className="box" maxW="sm" p="25px">
            <SimpleGrid spacingY="20px">
              <Box>
                Nama
                <InputBox />
              </Box>
              <Box>
                NRK/NIP
                <InputBox />
              </Box>
              <Box>
                Jabatan
                <InputBox />
              </Box>
              <Box>
                Instansi
                <InputBox />
              </Box>
              <Box>
                Email
                <InputBox />
              </Box>
              <Box>
                Password
                <PasswordInput />
              </Box>
              <ButtonBoxSignUp />
            </SimpleGrid>
          </Box>
        </AbsoluteCenter>
      </Center>
    </Box>
  );
}
export default RegisterBox;
