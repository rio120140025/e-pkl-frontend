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
    Flex,
    Center
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import ExportPDF from "./export-penilaian";
import Loading from "../../../../assets/74eD.gif";

const TableMahasiswaDetail = (props) => {
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const [dataPenilaian, setDataPenilaian] = useState(null);
    const [dataPKL, setDataPKL] = useState([]);
    useEffect(() => {
        const fetchPKLData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user/pkl/data", {
                    headers: { Authorization: "Bearer " + cookies.jwt_token.data },
                });

                const dataPKL = response.data.body.find((data) => data.mahasiswa.id == props.id);
                setDataPKL(dataPKL);
            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchPKLData();
    }, [props.id]);

    useEffect(() => {
        const fetchPenilaianData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user/penilaian", {
                    headers: { Authorization: "Bearer " + cookies.jwt_token.data },
                });

                const dataPenilaian = response.data.body.find((data) => data.pkl_id == dataPKL.id);
                setDataPenilaian(dataPenilaian);
            } catch (error) {
                console.log(error.response.data);
            }
        };

        if (dataPKL) {
            fetchPenilaianData();
        }
    }, [dataPKL]);

    // Conditional rendering based on data loading state
    if (!dataPKL || !dataPenilaian) {
        // While data is being fetched, display a loading state
        return <div>Loading...</div>;
    }
    // if (dataPenilaian == null) {
    //     return (
    //         <Center>
    //             <img
    //                 width="200px"
    //                 height="200px"
    //                 sizes="1000px"
    //                 src={Loading}
    //                 alt="loading..."
    //             />
    //         </Center>
    //     );
    // }
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
function ButtonBoxDetailPenilaian(props) {
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
                        <TableMahasiswaDetail pkl_id={props.pkl_id} penilaianId={props.penilaianId} id={props.id} />
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap='22px'>
                            <ExportPDF dataNilai={props.dataNilai} />
                            <Button onClick={onClose} className="button-box-2" bg='#93BFCF' color='#FFFFFF'>
                                Tutup
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ButtonBoxDetailPenilaian