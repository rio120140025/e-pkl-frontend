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
import {
  ButtonBoxDetailLogHarianDPLDetail,
  ButtonBoxTolak,
  ButtonBoxVerifikasi,
} from "./button-box";

const TableLogHarianDPLDetail = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const data = [
    {
      no: "1",
      kegiatan: "Kegiatan 1",
      alatBahan: "Alat dan Bahan 1",
      waktuPelaksanaan: "10",
      status: "Diverifikasi",
    },
    {
      no: "2",
      kegiatan: "Kegiatan 2",
      alatBahan: "Alat dan Bahan 2",
      waktuPelaksanaan: "8",
      status: "Belum Diverifikasi",
    },
    {
      no: "3",
      kegiatan: "Kegiatan 3",
      alatBahan: "Alat dan Bahan 3",
      waktuPelaksanaan: "12",
      status: "Ditolak",
    },
    {
      no: "4",
      kegiatan: "Kegiatan 4",
      alatBahan: "Alat dan Bahan 4",
      waktuPelaksanaan: "6",
      status: "Diverifikasi",
    },
    {
      no: "5",
      kegiatan: "Kegiatan 5",
      alatBahan: "Alat dan Bahan 5",
      waktuPelaksanaan: "9",
      status: "Diverifikasi",
    },
    {
      no: "6",
      kegiatan: "Kegiatan 6",
      alatBahan: "Alat dan Bahan 6",
      waktuPelaksanaan: "7",
      status: "Belum Diverifikasi",
    },
    {
      no: "7",
      kegiatan: "Kegiatan 7",
      alatBahan: "Alat dan Bahan 7",
      waktuPelaksanaan: "11",
      status: "Diverifikasi",
    },
    {
      no: "8",
      kegiatan: "Kegiatan 8",
      alatBahan: "Alat dan Bahan 8",
      waktuPelaksanaan: "5",
      status: "Ditolak",
    },
    {
      no: "9",
      kegiatan: "Kegiatan 9",
      alatBahan: "Alat dan Bahan 9",
      waktuPelaksanaan: "14",
      status: "Belum Diverifikasi",
    },
    {
      no: "10",
      kegiatan: "Kegiatan 10",
      alatBahan: "Alat dan Bahan 10",
      waktuPelaksanaan: "3",
      status: "Diverifikasi",
    },
  ];

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
      marginTop="28.86px"
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
            <Th colSpan={2} textAlign={"center"}>
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
              <Td>{row.no}</Td>
              <Td>{row.kegiatan}</Td>
              <Td>{row.alatBahan}</Td>
              <Td>{row.waktuPelaksanaan}</Td>
              <Td >
                  <ButtonBoxVerifikasi/>
              </Td>
              <Td>
                  <ButtonBoxTolak/>
              </Td>
              <Td>
                <Flex>
                  <ButtonBoxDetailLogHarianDPLDetail />
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

export default TableLogHarianDPLDetail;
