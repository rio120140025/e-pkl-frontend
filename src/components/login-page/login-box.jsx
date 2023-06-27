import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./box.css";

import InputBox from "./input-box";
import PasswordInput from "./password";
import { ButtonBoxSignIn } from "./button-box";

function LoginBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['name']);

  const navigate = useNavigate();
  if (cookies.jwt_token != null) {
    window.location.href = "/dashboard";
  } else {

  }
  const handleSignIn = () => {
    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/login", loginData)
      .then(response => {
        setCookie("jwt_token", response)
        if (response != null) {
          navigate("/dashboard");
        }
        else {
          console.log("Token tidak digenerated")
        }
      })
      .catch(error => {
        console.error(error.response.data);
      });
  };

  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" maxH="sm" p="25px">
          <SimpleGrid spacingY="20px">
            <Box>
              Email
              <InputBox email={email} handleSetEmail={(e) => setEmail(e.target.value)} />
            </Box>
            <Box>
              Password
              <PasswordInput password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
            </Box>
            <ButtonBoxSignIn handleSignIn={() => handleSignIn()}>Sign In</ButtonBoxSignIn>
            <Text className="button-text" onClick={onOpen} cursor="pointer">
              Forgot password?
            </Text>
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#FF0000"} />
            <Text
              textAlign={"center"}
              mt={5}
              mb={5}
              color={"#FF0000"}
              fontWeight={"bold"}
            >
              Forgot Password
            </Text>
            <Text
              textAlign={"center"}
              mt={5}
              mb={5}
              color={"#6096B4"}
              fontWeight={"bold"}
            >
              Please Contact Admin
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default LoginBox;
