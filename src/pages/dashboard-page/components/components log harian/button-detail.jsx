import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import {
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    Box,
    useToast,
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Text,
    Input
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



function DetailMahasiswaDosen(props) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate("/log-harian/detail");
        localStorage.setItem("pkl_id", e.target.value);
    };

    return (
        <Button

            variant="solid"
            w="81px"
            h="26px"
            cursor={"pointer"}
            textAlign={"center"}
            fontWeight={"bold"}
            bgColor={"#93BFCF"}
            borderRadius={5}
            color={"white"}
            _hover={{ background: "#c9f1ff", color: "#93BFCF" }}
            value={props.pkl_id}
            onClick={handleClick}
        >
            Detail
        </Button>
    );
}
function DetailLogHarianMahasiswaDosenDetail(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // buat dpl aja
    const [no, setNo] = useState('')
    const [kegiatan, setKegiatan] = useState(props.logHarian_data?.kegiatan || "");
    const [materi, setMateri] = useState(props.logHarian_data?.materi || "")
    const [prosedur, setProsedur] = useState(props.logHarian_data?.prosedur || "")
    const [hasil, setHasil] = useState(props.logHarian_data?.hasil || "")
    const [waktu, setWaktu] = useState(props.logHarian_data?.waktu || "")
    const [alat, setAlat] = useState(props.logHarian_data?.alatbahan || "")
    const [komentar, setKomentar] = useState(props.logHarian_data?.komentar || "")
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const toast = useToast();


    function callToast(title, status) {
        toast({
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        });
    }
    const simpan = () => {
        let updateData = {
            pkl_id: props.logHarian_data?.pkl_id || parseInt(props.pkl_id),
            kegiatan: kegiatan,
            prosedur: prosedur,
            alatbahan: alat,
            waktu: waktu,
            materi: materi,
            hasil: hasil,
            komentar: komentar,
            status: props.logHarian_data?.status || 1,

        }
        console.log(updateData)
        axios
            .post(`http://127.0.0.1:8000/api/user/jurnal/update/${props.logHarian_data.id}`, updateData, {
                headers: { Authorization: "Bearer " + cookies?.jwt_token?.data }
            })
            .then(response => {
                async function notif() {
                    await callToast("Berhasil Mengubah Log Harian", 'success')
                    setTimeout(() => {
                        window.location.reload();
                    }, 0);
                }
                notif()
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    Object.keys(error.response.data.errors).forEach(function (key, index) {
                        callToast(error.response.data.errors[key], 'error');
                    });
                }
            });

    }
    return (
        <>
            <Button
                variant="solid"
                color={"white"}
                fontWeight={"bold"}
                backgroundColor="#93BFCF"
                width={81}
                height={26}
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
                        {props.roles == '3' ?
                            <Box
                                marginTop="75px"
                                w={"450"}
                                borderRadius="5"
                                bgColor="#F9FAFC"
                                boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
                            >
                                <Flex direction='column'>
                                    <Table variant="striped">
                                        <Thead>
                                            <Tr>
                                                <Th>No</Th>
                                                <Th>Materi</Th>
                                                <Th>Prosedur</Th>
                                                <Th>Hasil Pelaksanaan</Th>
                                                <Th>Komentar</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr color="black">
                                                <Td>
                                                    {props.logHarian_data?.no}
                                                </Td>
                                                <Td>
                                                    <Text>{materi}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{prosedur}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{hasil}</Text>
                                                </Td>
                                                <Td>
                                                    <Input value={komentar} onChange={(e) => { setKomentar(e.target.value) }} />
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>

                                </Flex>
                            </Box >
                            :
                            // <TableView logHarian_data={props.logHarian_data} />
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
                                            <Th>Materi </Th>
                                            <Th>Prosedur </Th>
                                            <Th>Hasil Pelaksanaan </Th>
                                            <Th>Komentar </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr color="black">
                                            <Td>{props.logHarian_data?.no}</Td>
                                            <Td>{props.logHarian_data.materi}</Td>
                                            <Td>{props.logHarian_data.prosedur}</Td>
                                            <Td>{props.logHarian_data.hasil}</Td>
                                            <Td>{props.logHarian_data.komentar}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>
                        }

                    </ModalBody>
                    <ModalFooter>
                        {props.roles == '3' ?
                            <Flex gap='26px'><Button className="button-box-2" bg='#93BFCF' color='#FFFFFF' onClick={onClose}>
                                Tutup
                            </Button>
                                <Button className="button-box-2" bg='#93BFCF' width='150px' color='#FFFFFF' onClick={simpan}>
                                    <Text
                                        color='#FFF'
                                        textAlign='center'
                                        fontSize='14px'
                                        fontStyle='normal'
                                        fontWeight='700'
                                        lineHeight='16px'
                                    >Tambah Komentar</Text>
                                </Button>
                            </Flex>

                            :
                            <Button className="button-box-2" bg='#93BFCF' color='#FFFFFF' onClick={onClose}>
                                <Text
                                    color='#FFF'
                                    textAlign='center'
                                    fontSize='14px'
                                    fontStyle='normal'
                                    fontWeight='700'
                                    lineHeight='16px'
                                >Tutup</Text>
                            </Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}


export { DetailMahasiswaDosen, DetailLogHarianMahasiswaDosenDetail }