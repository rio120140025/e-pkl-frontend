import React, { useEffect, useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import axios from "axios";

import { ReactComponent as SortButton } from "../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icon-search.svg";
import { useCookies } from "react-cookie";
import {
  ButtonBoxDetailKehadiran,
  ButtonBoxDetailRencanaKegiatan,
} from "./button-box";
import TableKehadiranMahasiswa from "./table-kehadiran-mahasiswa";

const TableKehadiran = ({ roles_id, id }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(null);
  const [cookies] = useCookies(["name"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData1 = response1.data;
        setData1(updatedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token.data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/pkl/data",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData = response.data.body;
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token.data]);

  const filteredData = data.filter((item) =>
    item.mahasiswa.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    if (sortKey === "") return 0;
    const valA = a[sortKey] ? a[sortKey].toUpperCase() : "";
    const valB = b[sortKey] ? b[sortKey].toUpperCase() : "";

    if (valA === "" || valB === "") {
      if (valA === "") return sortOrder === "asc" ? 1 : -1;
      if (valB === "") return sortOrder === "asc" ? -1 : 1;
    }

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
  let no = 0;

  useEffect(() => {
    setSortKey("");
  }, []);

  if (data1 === null) {
    return (
      <Center marginTop={50}>
        <img width="200px" height="200px" sizes="1000px" src="74ed.gif" alt="loading..." />
      </Center>
    );
  }

  return (
    <>
      {parseInt(roles_id) === 1 && (
        <>
          {currentRows.map((row, index) => {
            if (row.mahasiswa_id === id) {
              return (
                <TableKehadiranMahasiswa
                  key={row.id}
                  id={row.id}
                  roles_id={roles_id}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {(parseInt(roles_id) === 2 || parseInt(roles_id) === 3) && (
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
          <Table variant="striped" top="1384px">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>
                  Nama{" "}
                  <Button
                    variant="link"
                    onClick={() => {
                      setSortKey("mahasiswa.name");
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
                      setSortKey("mahasiswa.nim");
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
                      setSortKey("dospem.name");
                      toggleSortOrder();
                    }}
                  >
                    <SortButton />
                  </Button>
                </Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentRows.map((row, index) => {
                if (row.dospem_id === id || row.dpl_id === id) {
                  return (
                    <Tr
                      key={index}
                      bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                      color="black"
                    >
                      <Td>{(no += 1)}</Td>
                      <Td>{row.mahasiswa.name}</Td>
                      <Td>{row.mahasiswa.nim}</Td>
                      <Td>{row.dospem.name}</Td>
                      <Td>
                        <Flex>
                          <ButtonBoxDetailKehadiran
                            id={row.id}
                            roles_id={roles_id}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                }
                return null;
              })}
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
      )}
    </>
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

export default TableKehadiran;
