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
import { ButtonBoxTolak, ButtonBoxVerifikasi } from "./button-box";

const TableKehadiranDPL = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const data = [
    {
      no: "1",
      tanggal: "2023-07-01",
      waktu: "09:00",
      kehadiran: "Hadir",
      keterangan: "Meeting",
      status: "Selesai",
    },
    {
      no: "2",
      tanggal: "2023-07-02",
      waktu: "14:30",
      kehadiran: "Hadir",
      keterangan: "Presentasi",
      status: "Belum Selesai",
    },
    {
      no: "3",
      tanggal: "2023-07-03",
      waktu: "10:15",
      kehadiran: "Tidak Hadir",
      keterangan: "Cuti",
      status: "Batal",
    },
    {
      no: "4",
      tanggal: "2023-07-04",
      waktu: "11:45",
      kehadiran: "Hadir",
      keterangan: "Diskusi",
      status: "Selesai",
    },
    {
      no: "5",
      tanggal: "2023-07-05",
      waktu: "08:30",
      kehadiran: "Hadir",
      keterangan: "Pelatihan",
      status: "Selesai",
    },
    {
      no: "6",
      tanggal: "2023-07-06",
      waktu: "13:00",
      kehadiran: "Hadir",
      keterangan: "Rapat Proyek",
      status: "Belum Selesai",
    },
    {
      no: "7",
      tanggal: "2023-07-07",
      waktu: "16:45",
      kehadiran: "Tidak Hadir",
      keterangan: "Sakit",
      status: "Batal",
    },
    {
      no: "8",
      tanggal: "2023-07-08",
      waktu: "10:30",
      kehadiran: "Hadir",
      keterangan: "Presentasi",
      status: "Selesai",
    },
    {
      no: "9",
      tanggal: "2023-07-09",
      waktu: "09:15",
      kehadiran: "Hadir",
      keterangan: "Diskusi",
      status: "Selesai",
    },
    {
      no: "10",
      tanggal: "2023-07-10",
      waktu: "14:00",
      kehadiran: "Hadir",
      keterangan: "Rapat Tim",
      status: "Belum Selesai",
    },
  ];

  const filteredData = data.filter((item) =>
    item.waktu.toLowerCase().includes(search.toLowerCase())
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
        marginBottom={2}
        marginLeft={875}
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
              Tanggal{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("tanggal");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Waktu{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("waktu");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Kehadiran{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("kehadiran");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Keterangan{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("Keterangan");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th colSpan={2} textAlign={"center"}>
              Aksi{" "}
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
              <Td>{row.tanggal}</Td>
              <Td>{row.waktu}</Td>
              <Td>{row.kehadiran}</Td>
              <Td>{row.keterangan}</Td>
              <Td>
                <ButtonBoxVerifikasi />
              </Td>
              <Td>
                <ButtonBoxTolak />
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

export default TableKehadiranDPL;
