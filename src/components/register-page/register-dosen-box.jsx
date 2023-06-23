import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, Button } from "@chakra-ui/react";
import "../login-page/box.css";
import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";

function RegisterBox() {
  return (
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
              Email
              <InputBox />
            </Box>
            <Box>
              Password
              <PasswordInput />
            </Box>
            <Button
              className="button-box"
              color={"#f5f5f5"}
              backgroundColor={"#bdcdd6"}
            >
              Sign Up
            </Button>
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}
export default RegisterBox;
