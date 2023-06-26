import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

import "../login-page/box.css";

import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";
import { ButtonBoxSignUp } from "../login-page/button-box";

function RegisterBoxDPL() {
  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" p="25px">
          <SimpleGrid spacingY="5px">
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
  );
}
export default RegisterBoxDPL;
