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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./button.css";

import { ReactComponent as PlusIcon } from "../../../assets/icon-plus.svg";
import TableEdit from "./table-edit";
import { color } from "framer-motion";

function ButtonBoxDownload() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      colorScheme="93BFCF"
      top="38.15px"
      left="30.5px"
      _hover={{ background: "#6096B4" }}
    >
      Download
    </Button>
  );
}
function ButtonBoxUbah() {
  return (
    <Link className="button-box-2" to="/profile/ubah">
      Ubah
    </Link>
  );
}
function ButtonBoxSimpan() {
  return (
    <Link className="button-box-2" to="/profile">
      Simpan
    </Link>
  );
}
function ButtonBoxDetail() {
  return (
    <Link className="button-box-table" to="/rencana-kegiatan/detail">
      Detail
    </Link>
  );
}
function ButtonBoxTambahRencana() {
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
            <TableEdit />
          </ModalBody>
          <ModalFooter>
            <ButtonBoxSimpan />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function ButtonBoxVerifikasi() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      bgColor="#C7F1D8"
      color="#20B95D"
      fontWeight={"bold"}
      _hover={{ background: "#20B95D", color: "#18753D" }}
    >
      Verifikasi
    </Button>
  );
}

function ButtonBoxTolak() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      bgColor="#FFECEC"
      color="#FF0000"
      fontWeight={"bold"}
      _hover={{ background: "#FF5B5B", color: "#7B2121" }}
    >
      Tolak
    </Button>
  );
}

export {
  ButtonBoxDownload,
  ButtonBoxUbah,
  ButtonBoxSimpan,
  ButtonBoxDetail,
  ButtonBoxTambahRencana,
  ButtonBoxVerifikasi,
  ButtonBoxTolak,
};
