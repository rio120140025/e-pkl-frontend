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
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";
import { TableEditPenilaian, ButtonBeriNilai, ButtonEditandDelete } from "./table-edit";

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

    // Helper function to compare dates
    const compareDates = (dateA, dateB) => {
        const a = new Date(dateA);
        const b = new Date(dateB);
        const formattedDateA = a.toISOString().split("T")[0];
        const formattedDateB = b.toISOString().split("T")[0];
        if (formattedDateA < formattedDateB) {
            return -1;
        }
        if (formattedDateA > formattedDateB) {
            return 1;
        }
        return 0;
    };

    // Helper function to get the sort value based on the sort key
    const getSortValue = (data, key) => {
        if (key === "mahasiswa.name") {
            return data?.mahasiswa?.name.toLowerCase();
        } else if (key === "dospem.name") {
            return data?.dospem?.name.toLowerCase();
        } else if (key === "lokasiPKL") {
            return data?.mahasiswa?.lokasi.toLowerCase();
        } else if (key === "penilaian.tgl_mulai") {
            return data?.penilaian?.tgl_mulai ? new Date(data.penilaian.tgl_mulai).toISOString().split("T")[0] : "";
        } else if (key === "penilaian.rerata") {
            return data?.penilaian?.rerata || 0;
        } else {
            return "";
        }
    };

    // Filtering function based on the search input
    const filterData = (data) => {
        return data.filter((row) => {
            const searchData = search.toLowerCase();
            const mahasiswaName = row?.mahasiswa?.name?.toLowerCase();
            const dospemName = row?.dospem?.name?.toLowerCase();
            const lokasiPKL = row?.mahasiswa?.lokasi?.toLowerCase();
            const tglMulai = row?.penilaian?.tgl_mulai?.split(" ")[0];
            const rerata = row?.penilaian?.rerata?.toString();

            return (
                (mahasiswaName && mahasiswaName.includes(searchData)) ||
                (dospemName && dospemName.includes(searchData)) ||
                (lokasiPKL && lokasiPKL.includes(searchData)) ||
                (tglMulai && tglMulai.includes(searchData)) || // Pencarian tanggal
                (rerata && rerata.includes(searchData))
            );
        });
    };

    const sortedAndFilteredData = filterData(sortData(sortedData));
    // Pagination calculations
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedAndFilteredData.slice(
        indexOfFirstRow,
        indexOfLastRow
    );

    const totalRows = sortedAndFilteredData.length;
    const firstRow = Math.min(totalRows, 1 + indexOfFirstRow);
    const lastRow = Math.min(totalRows, indexOfLastRow);

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
