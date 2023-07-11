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
    const [dataPenilaian, setDataPenilaian] = useState([]);
    const [dataPKL, setDataPKL] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    let index = 0
    const id = localStorage.getItem('id');
    console.log("id local host", id)

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
    console.log("data penilaian", dataPenilaian)


    const filteredData = (typeof dataPKL === 'object')
        ? Object.keys(dataPKL).reduce((result, key) => {
            const item = dataPKL[key];
            if (item && item.roles_id == 1 && item.name && item.name.toLowerCase().includes(search.toLowerCase())) {
                result.push(item);
            }
            return result;
        }, [])
        : [];

    const sortedData = filteredData.sort((a, b) => {
        if (sortKey === "") return 0;
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalRows = sortedData.length;
    const firstRow = indexOfFirstRow + 1;
    const lastRow = Math.min(indexOfLastRow, totalRows);


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
                            <Button variant="link" onClick={() => toggleSortOrder("lokasiPKL")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>Waktu</Th>
                        <Th>Nilai</Th>
                        <Th>Aksi</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{dataPKL && dataPKL.mahasiswa && dataPKL.mahasiswa.name}</Td>
                        <Td>{dataPKL && dataPKL.dospem && dataPKL.dospem.name}</Td>
                        <Td>{dataPKL && dataPKL.mahasiswa && dataPKL.mahasiswa.lokasi}</Td>
                        <Td>{dataPenilaian && dataPenilaian.tgl_mulai && dataPenilaian.tgl_mulai.split(" ")[0]} s.d {dataPenilaian && dataPenilaian.tgl_selesai && dataPenilaian.tgl_selesai.split(" ")[0]}</Td>
                        <Td>{dataPenilaian && dataPenilaian.rerata}</Td>

                        <Td>
                            <ButtonBoxDetailPenilaian />
                        </Td>
                    </Tr>
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
