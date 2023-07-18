//dah gk kepake
import React, { useState, useEffect } from "react";
import {
    Box,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Select,
    InputGroup,
    InputLeftElement,
    Flex,
    Spacer,
    HStack,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    Center,
    useToast,
    Text
} from "@chakra-ui/react";


import { ReactComponent as EditButton } from "../../../../assets/button-edit.svg";
import { ReactComponent as DeleteButton } from "../../../../assets/button-delete.svg";
import axios from "axios";
import { useCookies } from "react-cookie";



function ButtonEditLogHarianMahasiswa(props) {
    const [no, setNo] = useState('')
    const [kegiatan, setKegiatan] = useState(props.logHarian_data?.kegiatan || "");
    const [materi, setMateri] = useState(props.logHarian_data?.materi || "")
    const [prosedur, setProsedur] = useState(props.logHarian_data?.prosedur || "")
    const [hasil, setHasil] = useState(props.logHarian_data?.hasil || "")
    const [waktu, setWaktu] = useState(props.logHarian_data?.waktu || "")
    const [alat, setAlat] = useState(props.logHarian_data?.alatbahan || "")
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

    useEffect(() => {
        console.log(cookies?.jwt_token?.data)
        axios
            .get("http://127.0.0.1:8000/api/user/jurnal/data", {
                headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
            })
            .then((response) => {
                const dataLength = response.data.body.length
                console.log(dataLength)
                if (dataLength == undefined) {
                    setNo(1)
                }
                else {
                    setNo(dataLength + 1)
                }


            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);
    console.log("ini props", props.id)
    const simpan = () => {
        let updateData = {
            pkl_id: props.logHarian_data?.pkl_id || parseInt(props.pkl_id),
            kegiatan: kegiatan,
            prosedur: prosedur,
            alatbahan: alat,
            waktu: waktu,
            materi: materi,
            hasil: hasil,
            komentar: props.logHarian_data?.komentar || "Akan diisi oleh Dosen Lapangan",
            status: 1,

        }
        console.log(updateData)
        axios
            .post(`http://127.0.0.1:8000/api/user/jurnal/update/${props.id}`, updateData, {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
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
                Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
                    callToast(error.response.data.errors[key], 'error');
                });
            });

    }

    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();



    const handleDeleteRow = () => {
        onOpenDelete();
    };

    const handleConfirmDelete = () => {
        axios
            .post(`http://127.0.0.1:8000/api/user/jurnal/delete/${props.id}`, null, {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                async function notif() {
                    await callToast("Berhasil Menghapus Log Harian", 'success')
                    setTimeout(() => {
                        window.location.reload();
                    }, null);
                }
                notif()
            })
            .catch((error) => {
                if (error?.response?.data?.errors) {
                    Object.keys(error.response.data.errors).forEach(function (key, index) {
                        callToast(error.response.data.errors[key], "error");
                    });
                }
            });
        onCloseDelete();
    };
    return (
        <Flex gap='10px'>
            {props.roles_id == 1 ?
                <>
                    <EditButton onClick={onOpenEdit} w='22px' h='22px' />
                    <DeleteButton onClick={() => handleDeleteRow()} />
                </> : null}
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete} isLazy={true} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
                        <ModalCloseButton color={"#FF0000"} />
                        Apakah yakin menghapus rencana?
                    </ModalBody>
                    <Center>
                        <ModalFooter>
                            <HStack spacing={20}>
                                <Button
                                    bgColor={"#20B95D"}
                                    color={"white"}
                                    onClick={handleConfirmDelete}
                                    w={70}
                                >
                                    Ya
                                </Button>
                                <Button
                                    bgColor={"#FF0000"}
                                    color={"white"}
                                    onClick={onCloseDelete}
                                    w={70}
                                >
                                    Tidak
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size={"1"} isLazy={true} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <ModalCloseButton color={"#BDCDD6"} />
                        {/* <TableEdit logHarian_data={props.logHarian_data} isEdit="yes" id={props.id} /> */}
                        <Box
                            marginTop="75px"
                            w={"450"}
                            borderRadius="5"
                            bgColor="#F9FAFC"
                            boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
                        >
                            <Flex direction='column' gap='65px'>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th>No</Th>
                                            <Th>Kegiatan </Th>
                                            <Th>Materi</Th>
                                            <Th>Prosedur</Th>
                                            <Th>Hasil Pelaksanaan</Th>
                                            <Th>Waktu Pelaksanaan</Th>
                                            <Th>Alat dan Bahan</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr color="black">
                                            <Td>
                                                {no}
                                            </Td>
                                            <Td>
                                                <Input value={kegiatan} onChange={(e) => { setKegiatan(e.target.value) }} />
                                            </Td>
                                            <Td>
                                                <Input value={materi} onChange={(e) => { setMateri(e.target.value) }} />
                                            </Td>
                                            <Td>
                                                <Input value={prosedur} onChange={(e) => { setProsedur(e.target.value) }} />
                                            </Td>
                                            <Td>
                                                <Input value={hasil} onChange={(e) => { setHasil(e.target.value) }} />
                                            </Td>
                                            <Td>
                                                <Input value={waktu} type="date" onChange={(e) => { setWaktu(e.target.value) }} />
                                            </Td>
                                            <Td>
                                                <Input value={alat} onChange={(e) => { setAlat(e.target.value) }} />
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Flex>
                        </Box >
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="button-box-2" bg='#93BFCF' color='#FFFFFF'
                            _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
                            onClick={simpan}>Ubah</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>

    )

}
function VerifikasiDPL(props) {
    const { id_penilaian } = props;
    const [cookies] = useCookies(["jwt_token"]);
    const toast = useToast();

    const callToast = (title, status) => {
        toast({
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        });
    };

    const handleStatusChange = (id, status) => {
        let statusCode = 0;
        if (status === "verifikasi") {
            statusCode = 2;
        } else if (status === "tolak") {
            statusCode = 3;
        }

        axios
            .get("http://127.0.0.1:8000/api/user/jurnal/data", {
                headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
            })
            .then((response) => {
                const filteredData = response.data.body.find((dataPKL) => {
                    return dataPKL.id == id;
                });

                let updateData = {
                    pkl_id: filteredData.pkl_id,
                    kegiatan: filteredData.kegiatan,
                    prosedur: filteredData.prosedur,
                    alatbahan: filteredData.alatbahan,
                    waktu: filteredData.waktu,
                    materi: filteredData.materi,
                    hasil: filteredData.hasil,
                    komentar: filteredData.komentar,
                    status: statusCode,
                };

                axios
                    .post(`http://127.0.0.1:8000/api/user/jurnal/update/${id}`, updateData, {
                        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
                    })
                    .then((response) => {
                        async function notif() {
                            await callToast("Berhasil Mengubah Status Log Harian", "success");
                            setTimeout(() => {
                                window.location.reload();
                            }, 0);
                        }
                        notif();
                    })
                    .catch((error) => {
                        if (error?.response?.data?.errors) {
                            Object.keys(error.response.data.errors).forEach(function (key, index) {
                                callToast(error.response.data.errors[key], "error");
                            });
                        }
                    });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <Flex gap='9px'>
            <>
                <Button
                    borderRadius='5px'
                    background='#C7F1D8'
                    display='flex'
                    padding='3px 20px'
                    justifyContent='space-between'
                    alignItems='center'
                    onClick={() => handleStatusChange(id_penilaian, "verifikasi")}
                >
                    <Text
                        color='#20B95D'
                        fontFamily='Poppins'
                        fontSize='12px'
                        fontStyle='normal'
                        fontWeight='700'
                        lineHeight='20px'
                    >
                        Verifikasi
                    </Text>
                </Button>
                <Button
                    w='62px'
                    borderRadius='5px'
                    background='#FFECEC'
                    display='flex'
                    padding='3px 20px'
                    justifyContent='space-between'
                    alignItems='center'
                    onClick={() => handleStatusChange(id_penilaian, "tolak")}
                >
                    <Text
                        color='#FF0000'
                        fontFamily='Poppins'
                        fontSize='12px'
                        fontStyle='normal'
                        fontWeight='700'
                        lineHeight='20px'
                    >
                        Tolak
                    </Text>
                </Button>
            </>
        </Flex>
    );
}

export { ButtonEditLogHarianMahasiswa, VerifikasiDPL }
