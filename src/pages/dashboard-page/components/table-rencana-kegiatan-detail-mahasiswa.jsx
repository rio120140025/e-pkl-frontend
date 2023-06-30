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

import { ReactComponent as SortButton } from "../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icon-search.svg";
import { ReactComponent as BackButton } from "../../../assets/button-back.svg";
import { ReactComponent as EditButton } from "../../../assets/button-edit.svg";
import { ReactComponent as DeleteButton } from "../../../assets/button-delete.svg";
import {
  ButtonBoxDetail,
  ButtonBoxSimpan,
  ButtonBoxTambahRencana,
} from "./button-box";
import { Link } from "react-router-dom";
import TableEdit from "./table-edit";

const TableRencanaKegiatanDetailMahasiswa = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    {
      no: "1",
      capaian: "Capaian 1",
      subCapaian: "subCapaian 1",
      jumlahJam: "10",
      status: "Diverifikasi",
    },
    {
      no: "2",
      capaian: "Capaian 2",
      subCapaian: "subCapaian 2",
      jumlahJam: "8",
      status: "Belum Diverifikasi",
    },
    {
      no: "3",
      capaian: "Capaian 3",
      subCapaian: "subCapaian 3",
      jumlahJam: "12",
      status: "Ditolak",
    },
    {
      no: "4",
      capaian: "Capaian 4",
      subCapaian: "subCapaian 4",
      jumlahJam: "6",
      status: "Diverifikasi",
    },
    {
      no: "5",
      capaian: "Capaian 5",
      subCapaian: "subCapaian 5",
      jumlahJam: "9",
      status: "Diverifikasi",
    },
    {
      no: "6",
      capaian: "Capaian 6",
      subCapaian: "subCapaian 6",
      jumlahJam: "7",
      status: "Belum Diverifikasi",
    },
    {
      no: "7",
      capaian: "Capaian 7",
      subCapaian: "subCapaian 7",
      jumlahJam: "11",
      status: "Diverifikasi",
    },
    {
      no: "8",
      capaian: "Capaian 8",
      subCapaian: "subCapaian 8",
      jumlahJam: "5",
      status: "Ditolak",
    },
    {
      no: "9",
      capaian: "Capaian 9",
      subCapaian: "subCapaian 9",
      jumlahJam: "14",
      status: "Belum Diverifikasi",
    },
    {
      no: "10",
      capaian: "Capaian 10",
      subCapaian: "subCapaian 10",
      jumlahJam: "3",
      status: "Diverifikasi",
    },
  ]);

  const filteredData = data.filter((item) =>
    item.capaian.toLowerCase().includes(search.toLowerCase())
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
      marginTop="28.86px"
      marginLeft="30.5px"
      w={1314}
      borderRadius="5"
      bgColor="#F9FAFC"
      boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
    >
      <Link position="relative" marginTop={3} to="/rencana-kegiatan">
        <BackButton />
      </Link>
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
        <ButtonBoxTambahRencana />
      </HStack>
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
              Capaian{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("capaian");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Sub Capaian{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("subCapaian");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Jumlah Jam{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("jumlahJam");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th>
              Status{" "}
              <Button
                variant="link"
                onClick={() => {
                  setSortKey("status");
                  toggleSortOrder();
                }}
              >
                <SortButton />
              </Button>
            </Th>
            <Th colSpan={2} textAlign={"center"}>
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
              <Td>{row.no}</Td>
              <Td>{row.capaian}</Td>
              <Td>{row.subCapaian}</Td>
              <Td>{row.jumlahJam}</Td>
              <Td>{row.status}</Td>
              <Td>
                <EditButton onClick={onOpenEdit} />
              </Td>
              <Td>
                <DeleteButton onClick={() => handleDeleteRow(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
            <ModalCloseButton color={"#FF0000"} />
            Apakah yakin menghapus rencana?
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack spacing={20}>
                <Button
                  bgColor={"#20B95D"}
                  color={"white"}
                  onClick={handleConfirmDelete}
                  w={70}
                >
                  Ya
                </Button>
                <Button
                  bgColor={"#FF0000"}
                  color={"white"}
                  onClick={onCloseDelete}
                  w={70}
                >
                  Tidak
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableEdit />
          </ModalBody>
          <ModalFooter>
            <ButtonBoxSimpan />
          </ModalFooter>
        </ModalContent>
      </Modal>
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

export default TableRencanaKegiatanDetailMahasiswa;
