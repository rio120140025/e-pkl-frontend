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

import { ReactComponent as PlusIcon } from "../../../assets/icon-plus.svg";
import TableEdit from "./table-edit";
import TableView from "./table-view";

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
function ButtonBoxUbah() {
  return (
    <Link className="button-box-2" to="/profile/ubah">
      Ubah
    </Link>
  );
}
function ButtonBoxSimpanProfile() {
  return (
    <Link className="button-box-2" to="/profile">
      Simpan
    </Link>
  );
}
function ButtonBoxSimpanRencanaKegiatan() {
  return (
    <Link className="button-box-2" to="/rencana-kegiatan/detail">
      Simpan
    </Link>
  );
}
function ButtonBoxSimpanLogHarian() {
  return (
    <Link className="button-box-2" to="/log-harian">
      Simpan
    </Link>
  );
}
function ButtonBoxDetailRencanaKegiatan() {
  return (
    <Link className="button-box-table" to="/rencana-kegiatan/detail">
      Detail
    </Link>
  );
}
function ButtonBoxDetailLogHarianMahasiswa() {
  return (
    <Link className="button-box-table" to="/log-harian/detail">
      Detail
    </Link>
  );
}
function ButtonBoxDetailLogHarianMahasiswaDosenDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#93BFCF"
        width={81}
        height={26}
        marginTop={3}
        textAlign={"center"}
        _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
        onClick={onOpen}
      >
        Detail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableView />
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={onClose}>
              Tutup
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ButtonBoxDetailLogHarianDPLDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#93BFCF"
        width={81}
        height={26}
        marginTop={3}
        textAlign={"center"}
        _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
        onClick={onOpen}
      >
        Detail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableView />
          </ModalBody>
          <ModalFooter>
            <HStack spacing={10}>
            <button className="button-box-2" onClick={onClose}>
              Tutup
            </button>
            <button className="button-box-3" width="200px" onClick={onClose}>
              Tambah Komentar
            </button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
            <ButtonBoxSimpanRencanaKegiatan />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ButtonBoxTambahRencanaLogHarian() {
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
            <ButtonBoxSimpanLogHarian />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function ButtonBoxVerifikasi() {
  return (
    <Button
      variant="solid"
      w="81px"
      height="26px"
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
      variant="solid"
      w="81px"
      h="26px"
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
  ButtonBoxSimpanProfile,
  ButtonBoxSimpanRencanaKegiatan,
  ButtonBoxSimpanLogHarian,
  ButtonBoxDetailRencanaKegiatan,
  ButtonBoxDetailLogHarianMahasiswa,
  ButtonBoxDetailLogHarianMahasiswaDosenDetail,
  ButtonBoxDetailLogHarianDPLDetail,
  ButtonBoxTambahRencana,
  ButtonBoxTambahRencanaLogHarian,
  ButtonBoxVerifikasi,
  ButtonBoxTolak,
  ButtonBoxExport,
};
