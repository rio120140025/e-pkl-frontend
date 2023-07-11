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

const TableMahasiswaDetail = (props) => {
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const [dataPenilaian, setDataPenilaian] = useState([]);
    const [dataPKL, setDataPKL] = useState([]);
    const id = localStorage.getItem('id');
    useEffect(() => {
        let found = false
        axios
            .get("http://127.0.0.1:8000/api/user/penilaian", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            })
            .then((response) => {
                console.log("ini data", response.data.body)
                response.data.body.map((dataNilai) => {
                    console.log("dataNilai.pkl_id", dataNilai.pkl_id)
                    console.log("ini yang dicari", props.id)
                    if (dataNilai.pkl_id === props.id && found === false) {
                        console.log(dataNilai)
                        found = true
                        setDataPenilaian(dataNilai)
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
                        <Td>{props.no}</Td>
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


function ButtonBoxDetailPenilaianDosen(props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const [pklId, setPklId] = useState('');

    const handleTutupClick = () => {
        handleClose();
    };

    console.log("value saat ini", props.penilaianId);

    return (
        <>
            <Button
                variant="solid"
                color="white"
                fontWeight="bold"
                backgroundColor="#93BFCF"
                width={81}
                height={26}
                marginTop={3}
                textAlign="center"
                _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
                onClick={handleOpen}
            >
                Detail
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose} size="1">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <ModalCloseButton color="#BDCDD6" />
                        <TableMahasiswaDetail id={props.penilaianId} no={props.no} />
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="button-box-2"
                            value={props.penilaianId}
                            onClick={handleClose}
                        >
                            Tutup
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ButtonBoxDetailPenilaianDosen