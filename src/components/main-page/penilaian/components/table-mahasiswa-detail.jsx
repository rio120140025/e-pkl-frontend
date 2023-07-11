import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";

const TableMahasiswaDetail = () => {
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const [dataPenilaian, setDataPenilaian] = useState([]);
    const [dataPKL, setDataPKL] = useState([]);
    const id = localStorage.getItem('id');
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/pkl/data", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            })
            .then((response) => {
                response.data.body.map((dataPKL) => {
                    if (dataPKL.mahasiswa.id == id) {
                        setDataPKL(dataPKL)
                        return
                    }
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);
    console.log("data pkl", dataPKL)
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/penilaian", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            })
            .then((response) => {
                response.data.body.map((dataNilai) => {
                    console.log("id PKL", dataPKL.id)
                    console.log("dataNilai.pkl_id", dataNilai.pkl_id)
                    if (dataNilai.pkl_id == dataPKL.id) {
                        setDataPenilaian(dataNilai)
                        return
                    }
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, [dataPKL]);
    return (
        <Box
            marginTop="75px"
            w={"450"}
            borderRadius="5"
            bgColor="#F9FAFC"
            boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
        >
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Pengetahuan </Th>
                        <Th>Pelaksanaan </Th>
                        <Th>Kerja Sama </Th>
                        <Th>Kreativitas </Th>
                        <Th>Kedisplinan </Th>
                        <Th>Sikap </Th>
                        <Th>Rata-rata </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr color="black">
                        <Td>1</Td>
                        <Td>{dataPenilaian && dataPenilaian.pengetahuan}</Td>
                        <Td>{dataPenilaian && dataPenilaian.pelaksanaan}</Td>
                        <Td>{dataPenilaian && dataPenilaian.kerjasama}</Td>
                        <Td>{dataPenilaian && dataPenilaian.kreativitas}</Td>
                        <Td>{dataPenilaian && dataPenilaian.kedisiplinan}</Td>
                        <Td>{dataPenilaian && dataPenilaian.sikap}</Td>
                        <Td>{dataPenilaian && dataPenilaian.rerata}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};
function ButtonBoxDetailPenilaian() {
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
                        <TableMahasiswaDetail />
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
export default ButtonBoxDetailPenilaian