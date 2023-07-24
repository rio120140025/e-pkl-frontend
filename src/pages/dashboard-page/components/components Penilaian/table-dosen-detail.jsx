import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    Flex

} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import ExportPDF from "./export-penilaian";

const TableDosenDetail = (props) => {
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
                        <Td>{props.dataNilai?.penilaian?.pengetahuan}</Td>
                        <Td>{props.dataNilai?.penilaian?.pelaksanaan}</Td>
                        <Td>{props.dataNilai?.penilaian?.kerjasama}</Td>
                        <Td>{props.dataNilai?.penilaian?.kreativitas}</Td>
                        <Td>{props.dataNilai?.penilaian?.kedisiplinan}</Td>
                        <Td>{props.dataNilai?.penilaian?.sikap}</Td>
                        <Td>{props.dataNilai?.penilaian?.rerata}</Td>
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
                        <TableDosenDetail id={props.penilaianId} no={props.no} dataNilai={props.dataNilai} />
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap='22px'>
                            <ExportPDF dataNilai={props.dataNilai} />
                            <Button
                                className="button-box-2"
                                bg='#93BFCF'
                                color='#FFFFFF'
                                value={props.penilaianId}
                                onClick={handleClose}
                            >
                                Tutup
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ButtonBoxDetailPenilaianDosen