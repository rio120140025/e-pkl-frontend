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
import axios from "axios";

import { ReactComponent as SortButton } from "../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icon-search.svg";
import { ReactComponent as BackButton } from "../../../assets/button-back.svg";
import { ReactComponent as EditButton } from "../../../assets/button-edit.svg";
import { ReactComponent as DeleteButton } from "../../../assets/button-delete.svg";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";

import {
  ButtonBoxTambahRencana,
  ButtonBoxSimpanRencanaKegiatan,
  EditFunction,
  ButtonBoxVerifikasi,
  ButtonBoxTolak,
} from "./button-box";
import { TableEdit } from "./table-edit";

const TableRencanaKegiatanDetailMahasiswa = ({ id, roles_id }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["jwt_token"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/kegiatan",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData = response.data.body;
        setData(updatedData);
        console.log(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.capaian.toLowerCase().includes(search.toLowerCase())
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

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:8000/api/user/kegiatan/hapus/${deleteIndex}`,
        null,
        {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data },
        }
      )
      .then(() => {
        onCloseDelete();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const valueId = params.get("valueid");
  const valueRolesId = params.get("valuerolesid");

  const getStatusTextAndColor = (value) => {
    let statusText = "";
    let statusColor = "";

    switch (value) {
      case 1:
        statusText = "Belum Diverifikasi";
        statusColor = "#93BFCF";
        break;
      case 2:
        statusText = "Diverifikasi";
        statusColor = "#20B95D";
        break;
      case 3:
        statusText = "Ditolak";
        statusColor = "#FF0000";
        break;
    }

    return { statusText, statusColor };
  };

  const renderStatus = (value) => {
    const { statusText, statusColor } = getStatusTextAndColor(value);

    const statusStyle = {
      color: statusColor,
    };

    return <div style={statusStyle}>{statusText}</div>;
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
      <Link position="relative" marginTop={3} to="/rencana-kegiatan">
        <BackButton />
      </Link>
      {parseInt(valueRolesId) === 1 && (
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

          <ButtonBoxTambahRencana id={parseInt(valueId)} />
        </HStack>
      )}
      {parseInt(valueRolesId) === 2 ||
        (parseInt(valueRolesId) === 3 && (
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
        ))}
      <Table variant="striped" top="1384px" left="0" width="1314px">
        <Thead>
          {parseInt(valueRolesId) === 1 && (
            <Tr>
              <Th>No</Th>
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
                    setSortKey("sub_capaian");
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
                    setSortKey("jam");
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
          )}
          {parseInt(valueRolesId) === 2 && (
            <Tr>
              <Th>No</Th>
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
                    setSortKey("sub_capaian");
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
                    setSortKey("jam");
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
          )}
          {parseInt(valueRolesId) === 3 && (
            <Tr>
              <Th>No</Th>
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
                    setSortKey("sub_capaian");
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
                    setSortKey("jam");
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
            </Tr>
          )}
        </Thead>
        <Tbody>
          {currentRows.map((row, index) => {
            if (parseInt(valueRolesId) === 1) {
              if (row.pkl_id === parseInt(valueId)) {
                return (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                    color="black"
                  >
                    <Td>{(no += 1)}</Td>
                    <Td>{row.capaian}</Td>
                    <Td>{row.sub_capaian}</Td>
                    <Td>{row.jam}</Td>
                    <Td>{renderStatus(parseInt(row.status))}</Td>
                    <Td>
                      <EditFunction id={row.id} pkl_id={row.pkl_id} />
                    </Td>
                    <Td>
                      <DeleteButton onClick={() => handleDeleteRow(row.id)} />
                    </Td>
                  </Tr>
                );
              }
            } else if (parseInt(valueRolesId) === 2) {
              if (row.pkl_id === parseInt(valueId)) {
                if (parseInt(row.status) === 1) {
                  return (
                    <Tr
                      key={index}
                      bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                      color="black"
                    >
                      <Td>{(no += 1)}</Td>
                      <Td>{row.capaian}</Td>
                      <Td>{row.sub_capaian}</Td>
                      <Td>{row.jam}</Td>
                      <Td>
                        <ButtonBoxVerifikasi
                          id={row.id}
                          capaian={row.capaian}
                          sub_capaian={row.sub_capaian}
                          jam={row.jam}
                          pkl_id={row.pkl_id}
                        />
                      </Td>
                      <Td>
                        <ButtonBoxTolak
                          id={row.id}
                          capaian={row.capaian}
                          sub_capaian={row.sub_capaian}
                          jam={row.jam}
                          pkl_id={row.pkl_id}
                        />
                      </Td>
                    </Tr>
                  );
                } else {
                  return (
                    <Tr
                      key={index}
                      bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                      color="black"
                    >
                      <Td>{(no += 1)}</Td>
                      <Td>{row.capaian}</Td>
                      <Td>{row.sub_capaian}</Td>
                      <Td>{row.jam}</Td>
                      <Td>{renderStatus(parseInt(row.status))}</Td>
                      <Td />
                    </Tr>
                  );
                }
              }
            } else if (parseInt(valueRolesId) === 3) {
              if (row.pkl_id === parseInt(valueId)) {
                return (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                    color="black"
                  >
                    <Td>{(no += 1)}</Td>
                    <Td>{row.capaian}</Td>
                    <Td>{row.sub_capaian}</Td>
                    <Td>{row.jam}</Td>
                    <Td>{renderStatus(parseInt(row.status))}</Td>
                  </Tr>
                );
              }
            }
          })}
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
