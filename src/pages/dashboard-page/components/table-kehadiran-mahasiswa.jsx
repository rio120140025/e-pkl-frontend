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

import { ReactComponent as SortButton } from "../../../assets/button-sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icon-search.svg";
import { ReactComponent as EditButton } from "../../../assets/button-edit.svg";
import { ReactComponent as DeleteButton } from "../../../assets/button-delete.svg";
import {
  ButtonBoxSimpanLogHarian,
  ButtonBoxTambahRencanaKehadiran,
  ButtonBoxTolak2,
  ButtonBoxVerifikasi2,
  EditFunctionKehadiran,
} from "./button-box";
import { TableEditKehadiran } from "./table-edit";
import { useCookies } from "react-cookie";

import axios from "axios";
import { useLocation } from "react-router";

const TableKehadiranMahasiswa = ({ id, roles_id }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(null);
  const [found, setFound] = useState(false);
  const [cookies] = useCookies(["name"]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const valueId = params.get("valueid");
  const valueRolesId = params.get("valuerolesid");

  const getTimeAndDate = (datetime) => {
    const [date, time] = datetime.split(" ");
    return { date, time };
  };

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

  const getStatusText = (value) => {
    let statusText = "";

    switch (value) {
      case 1:
        statusText = "Hadir";
        break;
      case 2:
        statusText = "Sakit";
        break;
      case 3:
        statusText = "Izin";
        break;
      case 0:
        statusText = "Tanpa Kehadiran";
        break;
    }

    return { statusText };
  };

  const renderStatusKehadiran = (value) => {
    const { statusText } = getStatusText(value);

    return <div>{statusText}</div>;
  };
  useEffect(() => {
    if (data.length > 0) {
      data.forEach((entry) => {
        if (entry.tanggalwaktu) {
          getTimeAndDate(entry.tanggalwaktu);
        }
      });
    }
  }, [data]);

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
    axios
      .get("http://127.0.0.1:8000/api/user/kehadiran", {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        const dataKegiatan = response.data.body;
        let foundData = null;
        if (roles_id === 1) {
          foundData = dataKegiatan.filter((data) => data.pkl_id === id);
        } else if (
          parseInt(valueRolesId) === 2 ||
          parseInt(valueRolesId) === 3
        ) {
          foundData = dataKegiatan.filter(
            (data) => data.pkl_id === parseInt(valueId)
          );
        }

        if (foundData.length > 0) {
          console.log("Masuk", foundData);
          setFound(true);
          setData(foundData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id, roles_id, cookies.jwt_token.data]);

  console.log("mana nih", data);

  const filteredData = data.filter((item) => {
    const kehadiran = item.kehadiran.toString();
    const keterangan = item.keterangan || "";
    const status = item.status.toString();
    const { date, time } = getTimeAndDate(item.tanggalwaktu);

    const isMatch =
      kehadiran.includes(search) ||
      keterangan.includes(search) ||
      status.includes(search) ||
      date.includes(search) ||
      time.includes(search) ||
      getStatusText(parseInt(kehadiran))
        .statusText.toLowerCase()
        .includes(search.toLowerCase()) ||
      getStatusTextAndColor(parseInt(status))
        .statusText.toLowerCase()
        .includes(search.toLowerCase());

    return isMatch;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortKey === "") return 0;

    const compare = (valA, valB) => {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    };

    if (sortKey === "no") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortKey === "keterangan") {
      const valA = a.keterangan.toUpperCase();
      const valB = b.keterangan.toUpperCase();
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else if (sortKey === "kehadiran") {
      return compare(
        a.kehadiran.toString().toUpperCase(),
        b.kehadiran.toString().toUpperCase()
      );
    } else if (sortKey === "status") {
      return compare(a.status.toString(), b.status.toString());
    } else if (sortKey === "tanggalwaktu") {
      return sortOrder === "asc"
        ? new Date(a.tanggalwaktu) - new Date(b.tanggalwaktu)
        : new Date(b.tanggalwaktu) - new Date(a.tanggalwaktu);
    } else if (sortKey === "statusText") {
      const valA = getStatusTextAndColor(
        parseInt(a.status)
      ).statusText.toUpperCase();
      const valB = getStatusTextAndColor(
        parseInt(b.status)
      ).statusText.toUpperCase();
      return compare(valA, valB);
    } else if (sortKey === "kehadiranText") {
      const valA = getStatusText(
        parseInt(a.kehadiran)
      ).statusText.toUpperCase();
      const valB = getStatusText(
        parseInt(b.kehadiran)
      ).statusText.toUpperCase();
      return compare(valA, valB);
    } else {
      return 0;
    }
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
  let no = (currentPage - 1) * rowsPerPage;

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
        `http://127.0.0.1:8000/api/user/kehadiran/delete/${deleteIndex}`,
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
      {parseInt(roles_id) === 1 && (
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
          <ButtonBoxTambahRencanaKehadiran id={parseInt(id)} />
        </HStack>
      )}
      {(parseInt(valueRolesId) === 2 || parseInt(valueRolesId) === 3) && (
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
      )}

      <Table variant="striped" top="1384px" left="0" width="1314px">
        <Thead>
          {parseInt(roles_id) === 1 && (
            <Tr>
              <Th>No</Th>
              <Th>
                Tanggal{" "}
                <Button
                  variant="link"
                  onClick={() => {
                    setSortKey("tanggalwaktu");
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
                    setSortKey("tanggalwaktu");
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
                    setSortKey("keterangan");
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
              <Th>Aksi</Th>
            </Tr>
          )}
          {parseInt(valueRolesId) === 2 && (
            <Tr>
              <Th>No</Th>
              <Th>
                Tanggal{" "}
                <Button
                  variant="link"
                  onClick={() => {
                    setSortKey("tanggalwaktu");
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
                    setSortKey("tanggalwaktu");
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
                    setSortKey("keterangan");
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
          {parseInt(valueRolesId) === 3 && (
            <Tr>
              <Th>No</Th>
              <Th>
                Tanggal{" "}
                <Button
                  variant="link"
                  onClick={() => {
                    setSortKey("tanggalwaktu");
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
                    setSortKey("tanggalwaktu");
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
                    setSortKey("keterangan");
                    toggleSortOrder();
                  }}
                >
                  <SortButton />
                </Button>
              </Th>
              <Th>Aksi</Th>
            </Tr>
          )}
        </Thead>
        <Tbody>
          {currentRows.map((row, index) => {
            if (roles_id === 1) {
              return (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                  color="black"
                >
                  <Td>{(no += 1)}</Td>
                  <Td>{row.tanggalwaktu.split(" ")[0]}</Td>
                  <Td>{row.tanggalwaktu.split(" ")[1]}</Td>
                  <Td>{renderStatusKehadiran(parseInt(row.kehadiran))}</Td>
                  <Td>{row.keterangan}</Td>
                  <Td>{renderStatus(parseInt(row.status))}</Td>
                  <Td>
                    <Flex gap={"10px"}>
                      <EditFunctionKehadiran
                        id={row.id}
                        pkl_id={row.pkl_id}
                        no={no}
                      />
                      <DeleteButton onClick={() => handleDeleteRow(row.id)} />
                    </Flex>
                  </Td>
                </Tr>
              );
            } else if (parseInt(valueRolesId) === 2) {
              return (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                  color="black"
                >
                  <Td>{(no += 1)}</Td>
                  <Td>{row.tanggalwaktu.split(" ")[0]}</Td>
                  <Td>{row.tanggalwaktu.split(" ")[1]}</Td>
                  <Td>{renderStatusKehadiran(parseInt(row.kehadiran))}</Td>
                  <Td>{row.keterangan}</Td>
                  <Td>{renderStatus(parseInt(row.status))}</Td>
                </Tr>
              );
            } else if (parseInt(valueRolesId) === 3) {
              if (parseInt(row.status) === 1) {
                return (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "#FFFFFF" : "#F9FAFC"}
                    color="black"
                  >
                    <Td>{(no += 1)}</Td>
                    <Td>{row.tanggalwaktu.split(" ")[0]}</Td>
                    <Td>{row.tanggalwaktu.split(" ")[1]}</Td>
                    <Td>{renderStatusKehadiran(parseInt(row.kehadiran))}</Td>
                    <Td>{row.keterangan}</Td>
                    <Td>
                      <Flex gap={"10px"}>
                        <ButtonBoxVerifikasi2
                          id={row.id}
                          pkl_id={row.pkl_id}
                          tanggalwaktu={row.tanggalwaktu}
                          kehadiran={row.kehadiran}
                          keterangan={row.keterangan}
                        />
                        <ButtonBoxTolak2
                          id={row.id}
                          pkl_id={row.pkl_id}
                          tanggalwaktu={row.tanggalwaktu}
                          kehadiran={row.kehadiran}
                          keterangan={row.keterangan}
                        />
                      </Flex>
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
                    <Td>{row.tanggalwaktu.split(" ")[0]}</Td>
                    <Td>{row.tanggalwaktu.split(" ")[1]}</Td>
                    <Td>{renderStatusKehadiran(parseInt(row.kehadiran))}</Td>
                    <Td>{row.keterangan}</Td>
                    <Td>
                      <Td>{renderStatus(parseInt(row.status))}</Td>
                    </Td>
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
            Apakah anda yakin menghapus kehadiran?
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

export default TableKehadiranMahasiswa;
