import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

import "../../login-page/components/box.css";

import InputBox from "../../login-page/components/input-box";
import PasswordInput from "../../login-page/components/password";
import { ButtonBoxSignUp } from "../../login-page/components/button-box";

function RegisterBoxDosen() {
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
export default RegisterBoxDosen;
