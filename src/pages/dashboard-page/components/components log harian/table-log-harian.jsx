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
  Center

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
import { useQuery } from 'react-query';

function TableLogHarian() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(['jwt_token']);
  const id = localStorage.getItem('id');
  const roles_id = localStorage.getItem('roles_id');

  let data = []
  let nama = ''
  let nim = ''
  let dataJurnal = [];
  let pkl_id = ''
  let index = 0;
  const fetchPKLData = async (jwtToken) => {
    const pklDataResponse = await axios.get('http://127.0.0.1:8000/api/user/pkl/data', {
      headers: { Authorization: 'Bearer ' + jwtToken },
    });
    return pklDataResponse.data.body;
  };
  const fetchUserProfileData = async (jwtToken) => {
    const response = await axios.get('http://127.0.0.1:8000/api/user/profile', {
      headers: { Authorization: 'Bearer ' + jwtToken },
    });
    return response.data;
  };

  const fetchUserJurnalData = async (jwtToken) => {
    const response = await axios.get('http://127.0.0.1:8000/api/user/jurnal/data', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data;
  };

  const { data: pklData, isLoading: isPklDataLoading, isError: isPklDataError } = useQuery(
    'pklData',
    () => fetchPKLData(cookies?.jwt_token?.data ?? ''))
  const { data: jurnalData, isLoading: isJurnalDataLoading, isError: isJurnalDataError } = useQuery(
    'jurnalData',
    () => fetchUserJurnalData(cookies?.jwt_token?.data ?? ''))
  const { data: profileData, isLoading: isProfileDataLoading, isError: isProfileDataError } = useQuery(
    'profileData',
    () => fetchUserProfileData(cookies?.jwt_token?.data ?? '')
  );

  if (isProfileDataLoading || isPklDataLoading || isJurnalDataLoading) {
    return (
      <Center >
        <img width="200px" height="200px" sizes="1000px" src="74ed.gif" alt="loading..." />
      </Center>
    );
  }

  let findData = [];
  if (roles_id == 1) {
    findData = pklData.filter((dataPKL) => dataPKL.mahasiswa_id == id);
  } else if (roles_id == 2) {
    findData = pklData.filter((dataPKL) => dataPKL.dospem_id == id);
  } else {
    findData = pklData.filter((dataPKL) => dataPKL.dpl_id == id);
  }
  data = findData;
  console.log('===================================', data)
  if (roles_id == 1 && data == '') {
    nama = profileData.name;
    nim = profileData.nim;
  }
  else if (roles_id == 1 && data != '') {
    pkl_id = data[0]?.id
  }


  let combinedData = data.map((dataUser) => {
    const dataLog = jurnalData.body.filter((data) => data.pkl_id == dataUser.id);
    return { ...dataUser, dataLog };
  });
  dataJurnal = combinedData;
  console.log("ini  dataJurnal", jurnalData)
  const filteredData = dataJurnal.filter((item) => {
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

  const updatedRows = currentRows.map((item, index) => ({
    ...item,
    no: firstRow + index,
  }));
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
      <HStack marginLeft={roles_id == 1 ? 665 : 875} spacing={19}>
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
          {(roles_id == 1 && data == '') ? <Tr
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
          </Tr> : updatedRows.map((row, index) => (
            <Tr
              key={index}
              bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
              color="black"
            >
              <Td>{row.no}</Td>
              <Td>{row.mahasiswa.name}</Td>
              <Td>{row.mahasiswa.nim}</Td>
              <Td>{row.dospem.name}</Td>
              <Td>
                <Flex justifyContent="center" gap='10px'>
                  <DetailMahasiswaDosen pkl_id={row.id} data={row} />
                  <ExportPDF data={row} />
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
