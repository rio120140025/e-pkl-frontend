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
import { useCookies } from 'react-cookie';

import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";




const TableComponent = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [cookies, setCookie] = useCookies(['name']);
    // Fetch data from the API
    useEffect(() => {
        // Replace the fetch() call with your API call to fetch the data
        axios
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                setData(response.data)
                console.log(response.data)

            })
            .catch(error => {
                console.log(error.response.data)
            });
    }, []);

    const sortedData = data.sort((a, b) => {
        if (sortOrder === "asc") {
            return a[sortKey] - b[sortKey];
        } else {
            return b[sortKey] - a[sortKey];
        }
    });

    const filteredData = sortedData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );



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
            w={1314}
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
            <Table variant="striped" top="1384px" left="0" width="1314px">
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
                            Nama{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("nama");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            NIM{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("nim");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("dosenPembimbing");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Dosen Pembimbing Lapangan{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("dosenPembimbingLapangan");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                        <Th>
                            Tempat{" "}
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSortKey("tempat");
                                    toggleSortOrder();
                                }}
                            >
                                <SortButton />
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentRows.map((row) => (
                        <Tr key={row.id}>
                            <Td>{row.id}</Td>
                            <Td>{row.name}</Td>
                            <Td>{row.email}</Td>
                            <Td>{row.nim}</Td>
                            <Td>{row.dosbim}</Td>
                            <Td>{row.dpl}</Td>
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

export default TableComponent;
