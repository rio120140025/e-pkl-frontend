import React from "react";
import { AbsoluteCenter, Center, Divider, SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import "./box.css";
import InputBox from "./input-box";

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
              <InputBox />
            </Box>
            <Button className="button-box">Sign In</Button>
            <Text className="button-text" onClick={onOpen} cursor="pointer">
              Forgot password?
            </Text>
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <Divider mt={5} variant={"solid"} />
          <ModalBody>
            <Text textAlign={"center"} mt={5} mb={5}>
              Silahkan Hubungi Pihak Koperasi
            </Text>
          </ModalBody>
          <Divider variant={"solid"} />
          <ModalFooter>
            <Button
              bg={"royalRed.200"}
              color={"white"}
              mr={3}
              onClick={onClose}
              _hover={{
                background: "royalRed.200",
                color: "white",
              }}
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
export default CardBox;
