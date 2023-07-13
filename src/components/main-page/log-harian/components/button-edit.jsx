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
import {
    ButtonBoxDetailLogHarianMahasiswaDosenDetail,
    ButtonBoxSimpanLogHarian
} from "./button-box";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TableEdit } from "./table-edit";


function ButtonEditLogHarianMahasiswa(props) {
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
            .catch(error => {
                Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
                    callToast(error?.response?.data?.errors[key], 'error');
                });
            });
        onCloseDelete();
    };
    return (
        <Flex>
            {props.roles_id == 1 ? <Box> <Td>
                <EditButton onClick={onOpenEdit} />
            </Td>
                <Td>
                    <DeleteButton onClick={() => handleDeleteRow()} />
                </Td> </Box> : null}
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
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
            <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size={"1"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <ModalCloseButton color={"#BDCDD6"} />
                        <TableEdit logHarian_data={props.logHarian_data} isEdit="yes" id={props.id} />
                    </ModalBody>
                    <ModalFooter>
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
                            }, 5000);
                        }
                        notif();
                    })
                    .catch((error) => {
                        Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
                            callToast(error?.response?.data?.errors[key], "error");
                        });
                    });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <Flex>
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
        </Flex>
    );
}

export { ButtonEditLogHarianMahasiswa, VerifikasiDPL }
