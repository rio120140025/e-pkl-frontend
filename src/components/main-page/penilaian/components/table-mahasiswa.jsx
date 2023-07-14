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
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDisclosure } from "@chakra-ui/hooks";

import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";

import ButtonBoxDetailPenilaian from "./table-mahasiswa-detail";

const TableComponentMahasiswa = () => {
    const [dataPKL, setDataPKL] = useState([]);
    const [dataPenilaian, setDataPenilaian] = useState({});
    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const toggleSortOrder = (key) => {
        if (key === sortKey) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortOrder("asc");
        }
        setSortKey(key);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const id = localStorage.getItem("id");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/pkl/data", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            })
            .then((response) => {
                const filteredData = response.data.body.filter(
                    (dataPKL) => dataPKL.mahasiswa.id == id
                );
                setDataPKL(filteredData[0]);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    useEffect(() => {
        if (dataPKL.id) {
            axios
                .get(`http://127.0.0.1:8000/api/user/penilaian/${dataPKL.id}`, {
                    headers: { Authorization: "Bearer " + cookies.jwt_token.data },
                })
                .then((response) => {
                    setDataPenilaian(response.data.body);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }, [dataPKL]);

    // Sorting function
    const sortData = (data) => {
        const sorted = [...data].sort((a, b) => {
            const keyA = getSortValue(a, sortKey);
            const keyB = getSortValue(b, sortKey);

            if (keyA < keyB) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (keyA > keyB) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    // Helper function to get the sort value based on the sort key
    const getSortValue = (data, key) => {
        if (key === "name") {
            return data?.mahasiswa?.name.toLowerCase();
        } else if (key === "dosen") {
            return data?.dospem?.name.toLowerCase();
        } else if (key === "lokasiPKL") {
            return data?.mahasiswa?.lokasi.toLowerCase();
        } else if (key === "tgl_mulai") {
            return data?.tgl_mulai ? new Date(data.tgl_mulai).toISOString().split("T")[0] : "";
        } else if (key === "rerata") {
            return data?.rerata || 0;
        } else {
            return "";
        }
    };

    const sortedData = sortData([dataPKL]);
    // Pagination calculations
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    const totalRows = sortedData.length;
    const firstRow = Math.min(totalRows, 1 + indexOfFirstRow);
    const lastRow = Math.min(totalRows, indexOfLastRow);

    return (
        <Box>
            <InputGroup>
                <InputLeftElement>
                    <SearchIcon />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search..."
                />
            </InputGroup>

            <Table>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>
                            Mahasiswa{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("name")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("dosen")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Lokasi PKL{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("lokasiPKL")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>Waktu</Th>
                        <Th>Nilai</Th>
                        <Th>Aksi</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentRows.map((row, index) => (
                        <Tr key={row.id}>
                            <Td>{index + 1}</Td>
                            <Td>{row && row.mahasiswa && row.mahasiswa.name}</Td>
                            <Td>{row && row.dospem && row.dospem.name}</Td>
                            <Td>{row && row.mahasiswa && row.mahasiswa.lokasi}</Td>
                            <Td>
                                {row &&
                                    row.penilaian &&
                                    `${row.penilaian.tgl_mulai.split(" ")[0]} s.d ${row.penilaian.tgl_selesai.split(" ")[0]}`}
                            </Td>
                            <Td>{row && row.penilaian && row.penilaian.rerata}</Td>
                            <Td>
                                <ButtonBoxDetailPenilaian />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

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
    );
};

export default TableComponentMahasiswa;