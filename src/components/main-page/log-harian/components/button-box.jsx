import React from "react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./button.css";

import { ReactComponent as PlusIcon } from "../../../../assets/icon-plus.svg";
import { TableEdit, TableEditKehadiran } from "./table-edit";
import { TableView, TableViewPenilaian } from "./table-view";


function ButtonBoxExport() {
  return (
    <Button
      variant="solid"
      w="81px"
      h="26px"
      cursor={"pointer"}
      textAlign={"center"}
      fontWeight={"bold"}
      bgColor={"#FFD02C"}
      borderRadius={5}
      color={"white"}
      _hover={{ background: "#FFF5D2", color: "#FFD02C" }}
    >
      Export
    </Button>
  );
}

function ButtonBoxTambahRencanaLogHarian(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<PlusIcon />}
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#6096B4"
        width={200}
        marginTop={4}
        onClick={onOpen}
      >
        Tambah Rencana
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableEdit pkl_id={props.pkl_id} />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


export {
  ButtonBoxTambahRencanaLogHarian,
  ButtonBoxExport,
};
