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
import axios from "axios";
import { useCookies } from "react-cookie";
import { TableEditPenilaian, ButtonBeriNilai, ButtonEditandDelete } from "./table-edit";


import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";



const TableComponentDPL = () => {
    const [dataPenilaian, setDataPenilaian] = useState([]);
    const [dataPKL, setDataPKL] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedData, setSortedData] = useState([]);
    const [isDataUndefined, setIsDataUndefined] = useState(false); // State untuk menandakan jika data masih undefined
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const id = localStorage.getItem("id");

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

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/pkl/data", {
                headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
            })
            .then((response) => {
                const filteredData = response.data.body.filter(
                    (dataPKL) => dataPKL.dpl_id == id
                );
                setDataPKL(filteredData);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    useEffect(() => {
        if (dataPKL.length === 0) {
            return;
        }

        axios
            .get("http://127.0.0.1:8000/api/user/penilaian", {
                headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
            })
            .then((response) => {
                console.log("sblm combine", response.data.body)
                console.log("dataPKL", dataPKL)
                const combinedData = dataPKL.map((pkl) => {
                    const penilaian = response.data.body.find(
                        (nilai) => nilai.pkl_id === pkl.id
                    );
                    return { ...pkl, penilaian };
                });
                setSortedData(combinedData);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, [dataPKL]);

    useEffect(() => {
        // Check if sortedData has undefined values
        const hasUndefinedData = sortedData.some((item) => item.penilaian === undefined);
        setIsDataUndefined(hasUndefinedData);
    }, [sortedData]);
    useEffect(() => {
        let sorted = [...sortedData];
        if (sortKey === "nama") {
            sorted = sorted.sort((a, b) =>
                sortOrder === "asc"
                    ? a.mahasiswa.name.localeCompare(b.mahasiswa.name)
                    : b.mahasiswa.name.localeCompare(a.mahasiswa.name)
            );
        } else if (sortKey === "dosen") {
            sorted = sorted.sort((a, b) =>
                sortOrder === "asc"
                    ? a.dospem.name.localeCompare(b.dospem.name)
                    : b.dospem.name.localeCompare(a.dospem.name)
            );
        } else if (sortKey === "lokasiPKL") {
            sorted = sorted.sort((a, b) =>
                sortOrder === "asc"
                    ? a.mahasiswa.lokasi.localeCompare(b.mahasiswa.lokasi)
                    : b.mahasiswa.lokasi.localeCompare(a.mahasiswa.lokasi)
            );
        } else if (sortKey === "waktu") {
            sorted = sorted.sort((a, b) => {
                const tglMulaiA = new Date(a.penilaian.tgl_mulai);
                const tglMulaiB = new Date(b.penilaian.tgl_mulai);
                return sortOrder === "asc" ? tglMulaiA - tglMulaiB : tglMulaiB - tglMulaiA;
            });
        } else if (sortKey === "rerata") {
            sorted = sorted.sort((a, b) =>
                sortOrder === "asc"
                    ? a.penilaian.rerata - b.penilaian.rerata
                    : b.penilaian.rerata - a.penilaian.rerata
            );
        }
        setSortedData(sorted);
    }, [sortKey, sortOrder]);
    console.log("sortedData", sortedData)
    const filteredData = sortedData.filter((item) => {
        const nim = item.nim ? item.nim.toString() : "";
        const name = item.name ? item.name.toLowerCase() : "";
        return name.includes(search.toLowerCase()) || nim.includes(search);
    });
    console.log("filteredData", filteredData)
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalRows = filteredData.length;
    const firstRow = indexOfFirstRow + 1;
    const lastRow = Math.min(indexOfLastRow, totalRows);


    console.log("currentRows", currentRows)
    return (
        <Box>
            <InputGroup>
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

            <Table>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>
                            Mahasiswa{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("mahasiswa.name")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("dospem.name")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Lokasi PKL{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("lokasiPKL")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Waktu{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("penilaian.tgl_mulai")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Nilai{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("penilaian.rerata")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>Aksi</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentRows.map((row, index) => {
                        return (
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
                                <Td>
                                    {row && row.penilaian && row.penilaian.rerata ? (
                                        row.penilaian.rerata
                                    ) : (
                                        <ButtonBeriNilai no={index + 1} pkl_id={row && row.id} />
                                    )}
                                </Td>
                                <Td>
                                    <ButtonEditandDelete
                                        pkl_id={row && row.id}
                                        penilaian_id={row && row.penilaian && row.penilaian.id}
                                        no={index + 1}
                                    />
                                </Td>
                            </Tr>
                        );
                    })}
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
                <Box>
                    {totalRows > rowsPerPage && (
                        <Pagination
                            rowsPerPage={rowsPerPage}
                            totalRows={totalRows}
                            paginate={paginate}
                        />
                    )}
                </Box>
            </Flex>
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
export default TableComponentDPL;
