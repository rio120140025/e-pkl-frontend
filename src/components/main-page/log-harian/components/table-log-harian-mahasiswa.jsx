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
import { useCookies } from "react-cookie";


import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";

import {
  ButtonBoxExport,
  ButtonBoxTambahRencanaLogHarian,
} from "./button-box";
import { DetailMahasiswaDosen } from "./button-detail";
import axios from "axios";

function TableLogHarianMahasiswa() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(['jwt_token']);
  const [pkl_id, setPkl_id] = useState('')
  const id = localStorage.getItem('id');
  const roles_id = localStorage.getItem('roles_id');
  let index = 0;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/pkl/data", {
        headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
      })
      .then((response) => {
        const filteredData = response.data.body.filter((dataPKL) => {
          if (roles_id == 1) {
            // console.log("id mahasiswa", dataPKL.mahasiswa_id);
            // console.log("id", id);
            if (dataPKL.mahasiswa_id == id) {
              setPkl_id(dataPKL.id)
              console.log("berhasil");
              return true;
            }
          }
          else if (roles_id == 2) {
            if (dataPKL.dospem_id == id) {
              // console.log("berhasil");
              return true;
            }
          }
          else {
            if (dataPKL.dpl_id == id) {
              // console.log("berhasil");
              return true;

            }
          }
        });
        // console.log("test", filteredData);
        setData(filteredData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  console.log("ini  data", data)
  const filteredData = data.filter((item) => {
    const mahasiswaName = item.mahasiswa?.name || "";
    const dospemName = item.dospem?.name || "";
    const dplName = item.dpl?.name || "";

    const isMatch =
      mahasiswaName.toLowerCase().includes(search.toLowerCase()) ||
      dospemName.toLowerCase().includes(search.toLowerCase()) ||
      dplName.toLowerCase().includes(search.toLowerCase());

    return isMatch;
  });
  // console.log("ini filter data", filteredData)

  const sortedData = filteredData.sort((a, b) => {
    if (sortKey === "") return 0;
    const valA = a[sortKey]?.toUpperCase();
    const valB = b[sortKey]?.toUpperCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  // console.log("ini sorted data", sortedData)

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  console.log("current row", currentRows)


  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRows = sortedData.length;
  const firstRow = indexOfFirstRow + 1;
  const lastRow = Math.min(indexOfLastRow, totalRows);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDeleteRow = (index) => {
    setDeleteIndex(index);
    onOpenDelete();
  };

  const handleConfirmDelete = () => {
    const updatedData = [...data];
    updatedData.splice(indexOfFirstRow + deleteIndex, 1);
    setData(updatedData);
    onCloseDelete();
  };

  return (
    <Box
      // marginTop="28.86px"
      // marginLeft="30.5px"
      w='100%'
      borderRadius="5"
      bgColor="#F9FAFC"
      boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
    >
      <HStack marginLeft={665} spacing={19}>
        <InputGroup
          top="12px"
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
        {roles_id == 1 ? <ButtonBoxTambahRencanaLogHarian pkl_id={pkl_id} /> : null}
      </HStack>
      <Table variant="striped" top="100%" left="0" width="100%">
        <Thead>
          <Tr>
            <Th>
              No
            </Th>
            <Th>
              Mahasiswa{" "}
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
            <Th colSpan={4} textAlign={"center"}>
              Aksi
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
              <Td>{index += 1}</Td>
              <Td>{row.mahasiswa.name}</Td>
              <Td>{row.mahasiswa.nim}</Td>
              <Td>{row.dospem.name}</Td>
              <Td>
                <Flex>
                  {console.log("row id", row.id)}
                  <DetailMahasiswaDosen pkl_id={row.id} />
                </Flex>
              </Td>
              <Td>
                <Flex>
                  <ButtonBoxExport />
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

export default TableLogHarianMahasiswa;
