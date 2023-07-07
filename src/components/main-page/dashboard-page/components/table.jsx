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

import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("nama"); // Default sort key
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [cookies, setCookie] = useCookies(["jwt_token"]);
    let no = 0;

    let sortedData = [];
    let filteredData = [];

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

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
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, [cookies.jwt_token.data]);

    filteredData = data.filter((item) => {
        const nim = item.nim ? item.nim.toString() : "";
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            nim.includes(search)
        );
    });

    sortedData = filteredData.sort((a, b) => {
        if (sortKey === "") return 0;
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalRows = sortedData.length;
    const firstRow = indexOfFirstRow + 1;
    const lastRow = Math.min(indexOfLastRow, totalRows);

    return (
        <Box
            w="100%"
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
                        <Th>No</Th>
                        <Th>
                            Nama{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("name")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            NIM{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("nim")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("dosbim")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing Lapangan{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("dpl")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Tempat{" "}
                            <Button
                                variant="link"
                                onClick={() => toggleSortOrder("lokasi")}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentRows.map((row) =>
                        row.roles_id === 1 ? (
                            <Tr key={row.id}>
                                <Td>{(no += 1)}</Td>
                                <Td>{row.name}</Td>
                                <Td>{row.nim}</Td>
                                <Td>{row.dosbim}</Td>
                                <Td>{row.dpl}</Td>
                                <Td>{row.lokasi}</Td>
                            </Tr>
                        ) : null
                    )}
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
                    <Pagination rowsPerPage={rowsPerPage} totalRows={totalRows} paginate={paginate} />
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

export default TableComponent;
