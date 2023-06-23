import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import "./box.css";
import InputBox from "./input-box";
import PasswordInput from "./password";

function CardBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" maxH="sm" p="25px">
          <SimpleGrid spacingY="20px">
            <Box>
              Email
              <InputBox />
            </Box>
            <Box>
              Password
              <PasswordInput />
            </Box>
            <Button className="button-box" color={'#f5f5f5'} backgroundColor={'#bdcdd6'} >Sign In</Button>
            <Text className="button-text" onClick={onOpen} cursor="pointer" >
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
export default CardBox;
