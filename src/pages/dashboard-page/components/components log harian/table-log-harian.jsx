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
  useDisclosure,

} from "@chakra-ui/react";
import { useCookies } from "react-cookie";


import { ReactComponent as SortButton } from "../../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icon-search.svg";

import {
  ButtonBoxExport,
  ButtonBoxTambahRencanaLogHarian,
} from "./button-box";
import { DetailMahasiswaDosen } from "./button-detail";
import ExportPDF from './export-jurnal'
import axios from "axios";

function TableLogHarian() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [cookies, setCookie] = useCookies(['jwt_token']);
  const [pkl_id, setPkl_id] = useState('')
  const id = localStorage.getItem('id');
  const roles_id = localStorage.getItem('roles_id');


  let index = 0;
  // console.log("pkl_id", pkl_id)
  // console.log("id", pkl_id)
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
  console.log("pkl_id", pkl_id)
  console.log("roles id", roles_id)
  useEffect(() => {
    if (roles_id == 1 && pkl_id == '') {
      axios
        .get("http://127.0.0.1:8000/api/user/profile", {
          headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
        })
        .then((response) => {
          console.log("ini data mahasiswa", response.data)
          setNama(response.data.name)
          setNim(response.data.nim)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  },);

  console.log("ini  data", data)
  const filteredData = data.filter((item) => {
    const mahasiswaName = item.mahasiswa?.name || "";
    const mahasiswaNim = item.mahasiswa?.nim || "";
    const dospemName = item.dospem?.name || "";

    const isMatch =
      mahasiswaName.toLowerCase().includes(search.toLowerCase()) ||
      mahasiswaNim.toLowerCase().includes(search.toLowerCase()) ||
      dospemName.toLowerCase().includes(search.toLowerCase());

    return isMatch;
  });
  // console.log("ini filter data", filteredData)

  const sortedData = filteredData.sort((a, b) => {
    if (sortKey === "") return 0;
    if (sortKey === "no") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortKey === "nama") {
      const valA = a.mahasiswa.name.toUpperCase();
      const valB = b.mahasiswa.name.toUpperCase();
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else if (sortKey === "nim") {
      const valA = a.mahasiswa.nim.toUpperCase();
      const valB = b.mahasiswa.nim.toUpperCase();
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else if (sortKey === "dosenPembimbing") {
      const valA = a.dospem.name.toUpperCase();
      const valB = b.dospem.name.toUpperCase();
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return 0;
    }
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
      marginTop="28.86px"
      marginLeft="30.5px"
      marginBottom={15}
      w={1314}
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
            <Th textAlign={"center"}>
              Aksi
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(roles_id == 1 && pkl_id == '') ? <Tr
            key={index}
            bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
            color="black"
          >
            <Td>{index += 1}</Td>
            <Td>{nama}</Td>
            <Td>{nim}</Td>
            <Td></Td>
            <Td>
            </Td>
            <Td>
            </Td>
          </Tr> : currentRows.map((row, index) => (
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
                <Flex justifyContent="center" gap='10px'>
                  <DetailMahasiswaDosen pkl_id={row.id} />
                  <ExportPDF />
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

export default TableLogHarian;
