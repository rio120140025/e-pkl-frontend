import React, { useState } from "react";
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

import { ReactComponent as SortButton } from "../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icon-search.svg";

const data = [
  {
    no: "1",
    nama: "John",
    nim: "12345",
    dosenPembimbing: "Dr. Smith",
    dosenPembimbingLapangan: "Prof. Johnson",
    tempat: "Lab A",
  },
  {
    no: "2",
    nama: "Jane",
    nim: "67890",
    dosenPembimbing: "Dr. Brown",
    dosenPembimbingLapangan: "Prof. Davis",
    tempat: "Lab B",
  },
];

const TableComponent = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
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
      marginTop="95px"
      marginLeft="30.5px"
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
          {currentRows.map((row, index) => (
            <Tr
              key={index}
              bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
              color="black"
            >
              <Td>{row.no}</Td>
              <Td>{row.nama}</Td>
              <Td>{row.nim}</Td>
              <Td>{row.dosenPembimbing}</Td>
              <Td>{row.dosenPembimbingLapangan}</Td>
              <Td>{row.tempat}</Td>
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
