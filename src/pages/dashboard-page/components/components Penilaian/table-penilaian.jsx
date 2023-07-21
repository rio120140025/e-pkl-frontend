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
    Center
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";
import { ButtonBeriNilai, ButtonEditandDelete } from "./table-edit";
import ButtonBoxDetailPenilaian from "./table-mahasiswa-detail";
import ButtonBoxDetailPenilaianDosen from "./table-dosen-detail";

const TableComponentPenilaian = (props) => {
    const [dataPenilaian, setDataPenilaian] = useState([]);
    const [dataPKL, setDataPKL] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedData, setSortedData] = useState([]);
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    const [nama, setNama] = useState('');
    const [pkl_id, setPkl_id] = useState('')
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    let index = 0
    console.log(props.pkl_id)
    console.log(props.id)
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
        const fetchData = async () => {
            try {
                const pklDataResponse = await axios.get("http://127.0.0.1:8000/api/user/pkl/data", {
                    headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
                });

                let filteredData = [];
                if (props.roles_id == 1) {
                    filteredData = pklDataResponse.data.body.filter((dataPKL) => dataPKL.mahasiswa_id == props.id);
                } else if (props.roles_id == 2) {
                    filteredData = pklDataResponse.data.body.filter((dataPKL) => dataPKL.dospem_id == props.id);
                } else {
                    filteredData = pklDataResponse.data.body.filter((dataPKL) => dataPKL.dpl_id == props.id);
                }

                setDataPKL(filteredData);
                setPkl_id(filteredData.length > 0 ? filteredData[0].id : "");
                setIsDataLoaded(true);

                if (props.roles_id == 1 && pkl_id == "") {
                    const profileResponse = await axios.get("http://127.0.0.1:8000/api/user/profile", {
                        headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
                    });
                    setNama(profileResponse.data.name);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchData();

    }, [props.roles_id, props.pkl_id, props.id, cookies.jwt_token.data]);

    useEffect(() => {
        if (dataPKL.length === 0) {
            return;
        }

        const fetchPenilaianData = async () => {
            try {
                const penilaianResponse = await axios.get("http://127.0.0.1:8000/api/user/penilaian", {
                    headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
                });

                const combinedData = dataPKL.map((pkl) => {
                    const penilaian = penilaianResponse.data.body.find((nilai) => nilai.pkl_id === pkl.id);
                    return { ...pkl, penilaian };
                });

                setSortedData(combinedData);
            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchPenilaianData();

    }, [dataPKL]);
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
    console.log("pkl_id", pkl_id)
    console.log("nama", nama)
    console.log("currentRows", currentRows)

    if (currentRows === null || currentRows.length === 0) {
        return (
            <Center marginTop={100}>
                <img width="200px" height="200px" sizes="1000px" src="74ed.gif" alt="loading..." />
            </Center>
        );
    }
    const updatedRows = currentRows.map((item, index) => ({
        ...item,
        no: firstRow + index, // Calculate the correct "no" for each row on the current page.
    }));

    console.log("updatedRows", updatedRows);
    return (
        <Box
            marginTop="28.86px"
            marginLeft="30.5px"
            marginBottom={15}
            w={1314}
            borderRadius="5"
            bgColor="#F9FAFC"
            boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
        >
            <InputGroup
                top="12px"
                marginBottom={2}
                backgroundColor="#fff"
                width="418px"
                fontSize="14px"
                color="#a1a9b8"
                float='right'
                pr='19px'
            >
                <InputLeftElement>
                    <SearchIcon />
                </InputLeftElement>
                {props.roles_id == 1 ?
                    <Input
                        type="text"
                        placeholder="Search..."
                    />
                    :
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />}

            </InputGroup>
            <Table Table variant="striped" top="100%" left="0" width="100%">
                <Thead>
                    <Tr>
                        <Th style={{ textAlign: "left" }}>No</Th>
                        <Th style={{ textAlign: "left" }}>
                            Mahasiswa{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("mahasiswa.name")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th style={{ textAlign: "left" }}>
                            Dosen Pembimbing{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("dospem.name")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th style={{ textAlign: "left" }}>
                            Lokasi PKL{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("lokasiPKL")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th style={{ textAlign: "left" }}>
                            Waktu{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("penilaian.tgl_mulai")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th style={{ textAlign: "left" }}>
                            Nilai{" "}
                            <Button variant="link" onClick={() => toggleSortOrder("penilaian.rerata")}>
                                <SortButton />
                            </Button>
                        </Th>
                        <Th style={{ textAlign: "left" }}>Aksi</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {console.log('ini id pkl', pkl_id)}
                    {(props.roles_id == 1 && (pkl_id == undefined || pkl_id == null || pkl_id == '')) ?
                        <Tr key={index} bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"} color="black">
                            <Td style={{ textAlign: "left" }}>{index += 1}</Td>
                            <Td style={{ textAlign: "left" }}>{nama}</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr> :
                        updatedRows.map((row, index) => {
                            return (
                                <Tr key={index} bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"} color="black">
                                    <Td style={{ textAlign: "left" }}>{row.no}</Td>
                                    <Td style={{ textAlign: "left" }}>{row && row.mahasiswa && row.mahasiswa.name}</Td>
                                    <Td style={{ textAlign: "left" }}>{row && row.dospem && row.dospem.name}</Td>
                                    <Td style={{ textAlign: "left" }}>{row && row.mahasiswa && row.mahasiswa.lokasi}</Td>
                                    <Td style={{ textAlign: "left" }}>
                                        {row &&
                                            row.penilaian &&
                                            `${row.penilaian.tgl_mulai.split(" ")[0]} s.d ${row.penilaian.tgl_selesai.split(" ")[0]}`}
                                    </Td>
                                    {props.roles_id == 3 ?
                                        <Td style={{ textAlign: "left" }}>
                                            {row && row.penilaian && row.penilaian.rerata ? (
                                                row.penilaian.rerata
                                            ) : (
                                                <ButtonBeriNilai no={index + 1} pkl_id={row && row.id} />
                                            )}
                                        </Td> :
                                        <Td style={{ textAlign: "left" }}>
                                            {row && row.penilaian && row.penilaian.rerata}
                                        </Td>
                                    }

                                    <Td style={{ textAlign: "left" }}>
                                        {props.roles_id == 1 && <ButtonBoxDetailPenilaian
                                            pkl_id={row && row.penilaian && row.penilaian.pkl_id}
                                            penilaianId={row && row.penilaian && row.penilaian.id}
                                            dataNilai={row}
                                            id={props.id}
                                        />}
                                        {props.roles_id == 2 &&
                                            <ButtonBoxDetailPenilaianDosen
                                                pkl_id={row && row.penilaian && row.penilaian.pkl_id} no={index + 1}
                                                penilaianId={row && row.penilaian && row.penilaian.id}
                                                dataNilai={row}
                                                id={props.id}
                                            />
                                        }
                                        {props.roles_id == 3 &&
                                            <ButtonEditandDelete
                                                isNilaiExsist={row.penilaian}
                                                width='max-content'
                                                pkl_id={row && row.id}
                                                penilaian_id={row && row.penilaian && row.penilaian.id}
                                                no={index + 1}
                                            />
                                        }
                                    </Td>
                                </Tr>
                            );
                        })
                    }
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
        </Box >
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
export default TableComponentPenilaian;
