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
} from "@chakra-ui/react";

import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";
import { ReactComponent as EditButton } from "../../../../assets/button-edit.svg";
import { ReactComponent as DeleteButton } from "../../../../assets/button-delete.svg";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TableEdit } from "./table-edit";
import { ButtonEditLogHarianMahasiswa, VerifikasiDPL } from "./button-edit";
import { DetailLogHarianMahasiswaDosenDetail } from "./button-detail";

const TableDetail = () => {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const id = localStorage.getItem('id');
    const [data, setData] = useState([])

    const roles_id = localStorage.getItem('roles_id');
    const pkl_id = localStorage.getItem('pkl_id')
    console.log("pkl_id", pkl_id)
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/jurnal/data", {
                headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
            })
            .then((response) => {
                const filteredData = response.data.body.filter((dataPKL) => {
                    if (dataPKL.pkl_id == pkl_id) {
                        return true;
                    }
                });
                // console.log("test", filteredData);
                setData(filteredData);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const filteredData = data.filter((item) =>
        item.kegiatan.toLowerCase().includes(search.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
        if (sortKey === "") return 0;
        const valA = a[sortKey].toUpperCase();
        const valB = b[sortKey].toUpperCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalRows = sortedData.length;
    const firstRow = indexOfFirstRow + 1;
    const lastRow = Math.min(indexOfLastRow, totalRows);
    return (
        <Box
            // marginTop="28.86px"
            // marginLeft="30.5px"
            w='100%'
            borderRadius="5"
            bgColor="#F9FAFC"
            boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
        >
            <InputGroup
                top="12px"
                marginLeft={875}
                marginBottom={2}
                backgroundColor="#fff"
                width="418px"
                fontSize="14px"
                color="#a1a9b8"
            >
                <InputLeftElement>
                    <SearchIcon />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            <Table variant="striped" top="1384px" left="0" width="100%">
                <Thead>
                    <Tr>
                        <Th>
                            No
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("no");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Kegiatan{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("kegiatan");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Alat dan Bahan{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("alatBahan");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Waktu Pelaksanaan{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("waktuPelaksanaan");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Status{" "}
                        </Th>
                        <Th textAlign={"center"}>Aksi</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentRows.map((row, index) => (
                        <Tr
                            key={index}
                            bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                            color="black"
                        >
                            <Td>{row.id}</Td>
                            <Td>{row.kegiatan}</Td>
                            <Td>{row.alatbahan}</Td>
                            <Td>{row.waktu}</Td>
                            <Td>
                                {roles_id == 1 || roles_id == 2 && (
                                    <>
                                        {row.status == 1 && (
                                            <span
                                                color='#93BFCF'
                                                fontFamily='Poppins'
                                                fontSize='12px'
                                                fontStyle='normal'
                                                fontWeight='700'
                                                lineHeight='20px'
                                            >
                                                Belum Diverifikasi
                                            </span>
                                        )}
                                        {row.status == 2 && (
                                            <span
                                                color='#20B95D'
                                                fontFamily='Poppins'
                                                fontSize='12px'
                                                fontStyle='normal'
                                                fontWeight='700'
                                                lineHeight='20px'
                                            >
                                                Diverifikasi
                                            </span>
                                        )}
                                        {row.status == 3 && (
                                            <span
                                                color='#F00'
                                                fontFamily='Poppins'
                                                fontSize='12px'
                                                fontStyle='normal'
                                                fontWeight='700'
                                                lineHeight='20px'
                                            >
                                                Ditolak
                                            </span>
                                        )}
                                    </>
                                )}
                                {roles_id == 3 && <VerifikasiDPL id_penilaian={row.id} />}
                            </Td>
                            <Td>
                                <Flex>
                                    <DetailLogHarianMahasiswaDosenDetail logHarian_data={row} roles={roles_id} />
                                    <ButtonEditLogHarianMahasiswa roles_id={roles_id} logHarian_data={row} id={row.id} />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Box>
                <Flex>
                    <Box marginLeft="25px" fontSize="14px" color="#687182">
                        {firstRow} - {lastRow} of {totalRows}
                    </Box>
                    <Spacer />
                    <Box
                        display="flex"
                        fontSize="14px"
                        color="#687182"
                        alignItems="center"
                        marginRight={25}
                    >
                        <Box width={200} marginRight={2}>
                            Rows per page:
                        </Box>
                        <Select
                            variant="unstyled"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                            border="none"
                            marginBlock={1}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </Select>
                    </Box>
                </Flex>
            </Box>

            <Box>
                {totalRows > rowsPerPage && (
                    <Pagination
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        paginate={paginate}
                    />
                )}
            </Box>
        </Box>
    );
};

const Pagination = ({ rowsPerPage, totalRows, paginate }) => {
    const pageNumbers = Math.ceil(totalRows / rowsPerPage);

    return (
        <Box>
            {Array.from({ length: pageNumbers }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <Button key={pageNumber} onClick={() => paginate(pageNumber)}>
                        {pageNumber}
                    </Button>
                );
            })}
        </Box>
    );
};

export default TableDetail;
