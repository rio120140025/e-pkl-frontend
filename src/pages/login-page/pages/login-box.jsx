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

import "../components/box.css";

import InputBox from "../components/input-box";
import PasswordInput from "../components/password";
import { ButtonBoxSignIn } from "../components/button-box";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

function LoginBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);
  const [cookies, setCookies] = useCookies(["name"]);

  const handleSignIn = () => {
    const loginData = {
      email: email,
      password: password,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/login", loginData, {
        headers: { Authorization: "Bearer " + cookies.token },
      })
      .then((response) => {
        console.log("response", response);
        setCookies("token", response);
        if (response != null) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setErrorLogin(error.response.data.reason);
      })
      .finally(() => {});
  };

  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" maxH="sm" p="25px">
          <SimpleGrid spacingY="20px">
            <Box>
              Email
              <InputBox
                value={email}
                handleSetEmail={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              Password
              <PasswordInput
                value={password}
                handleSetPassword={(e) => setPassword(e.target.value)}
              />
            </Box>
            <ButtonBoxSignIn cek="cek" handleSignIn={() => handleSignIn()} />
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
