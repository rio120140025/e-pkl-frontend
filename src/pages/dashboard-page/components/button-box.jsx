import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  HStack,
  Center,
  ModalHeader,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

import "./button.css";

import { ReactComponent as PlusIcon } from "../../../assets/icon-plus.svg";
import { TableEdit, TableEditKehadiran } from "./table-edit";
import { TableView, TableViewPenilaian } from "./table-view";
import { useCookies } from "react-cookie";

import { ReactComponent as EditButton } from "../../../assets/button-edit.svg";
import { ReactComponent as CloseButton } from "../../../assets/button-close.svg";

function ButtonBox(props) {
  return (
    <Button
      onClick={() => props.handle()}
      variant="solid"
      w="121px"
      colorScheme="#93BFCF"
      bg="#93BFCF"
    >
      {props.name}
    </Button>
  );
}

export default ButtonBox;

function ButtonBoxDownload() {
  return (
    <a className="button-box-download" href="docs.pdf" target="_blank" download>
      Download
    </a>
  );
}
function ButtonBoxKirim() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      colorScheme="93BFCF"
      top="38.15px"
      left="1200px"
      _hover={{ background: "#6096B4" }}
    >
      Kirim
    </Button>
  );
}
function ButtonBoxExport() {
  return (
    <Button
      variant="solid"
      w="81px"
      h="26px"
      cursor={"pointer"}
      textAlign={"center"}
      fontWeight={"bold"}
      bgColor={"#FFD02C"}
      borderRadius={5}
      color={"white"}
      _hover={{ background: "#FFF5D2", color: "#FFD02C" }}
    >
      Export
    </Button>
  );
}
function ButtonBoxUbah() {
  return (
    <Link className="button-box-2" to="/profile/ubah">
      Ubah
    </Link>
  );
}
function ButtonBoxSimpanProfile() {
  return (
    <Link className="button-box-2" to="/profile">
      Simpan
    </Link>
  );
}
function ButtonBoxSimpanRencanaKegiatan() {
  return (
    <Link className="button-box-2" to="/rencana-kegiatan/detail">
      Simpan
    </Link>
  );
}
function ButtonBoxSimpanLogHarian() {
  return (
    <Link className="button-box-2" to="/log-harian">
      Simpan
    </Link>
  );
}
function ButtonBoxDetailRencanaKegiatan({ id, roles_id }) {
  return (
    <Link
      className="button-box-table"
      to={`/rencana-kegiatan/detail?valueid=${id}&valuerolesid=${roles_id}`}
    >
      Detail
    </Link>
  );
}
function ButtonBoxDetailKehadiran({ id, roles_id }) {
  return (
    <Link
      className="button-box-table"
      to={`/kehadiran/detail?valueid=${id}&valuerolesid=${roles_id}`}
    >
      Detail
    </Link>
  );
}
function ButtonBoxDetailLogHarianMahasiswa() {
  return (
    <Link className="button-box-table" to="/log-harian/detail">
      Detail
    </Link>
  );
}
function ButtonBoxDetailPenilaian() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#93BFCF"
        width={81}
        height={26}
        marginTop={3}
        textAlign={"center"}
        _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
        onClick={onOpen}
      >
        Detail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableViewPenilaian />
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={onClose}>
              Tutup
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ButtonBoxDetailLogHarianMahasiswaDosenDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#93BFCF"
        width={81}
        height={26}
        marginTop={3}
        textAlign={"center"}
        _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
        onClick={onOpen}
      >
        Detail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableView />
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={onClose}>
              Tutup
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ButtonBoxDetailLogHarianDPLDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#93BFCF"
        width={81}
        height={26}
        marginTop={3}
        textAlign={"center"}
        _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
        onClick={onOpen}
      >
        Detail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableView />
          </ModalBody>
          <ModalFooter>
            <HStack spacing={10}>
              <button className="button-box-2" onClick={onClose}>
                Tutup
              </button>
              <button className="button-box-3" width="200px" onClick={onClose}>
                Tambah Komentar
              </button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const ButtonBoxTambahRencana = ({ id }) => {
  const [capaian, setCapaian] = useState("");
  const [subCapaian, setSubCapaian] = useState("");
  const [jam, setJam] = useState("");
  const [cookies] = useCookies(["jwt_token"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      capaian: capaian,
      sub_capaian: subCapaian,
      jam: jam,
      status: 1,
      pkl_id: id,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/kegiatan/tambah", data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
        setCapaian("");
        setSubCapaian("");
        setJam("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<PlusIcon />}
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#6096B4"
        width={200}
        marginTop={4}
        onClick={onOpen}
      >
        Tambah Rencana
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <Box
              marginTop="75px"
              w={"450"}
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Capaian </Th>
                    <Th>Sub Capaian </Th>
                    <Th>Jumlah Jam </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr color="black">
                    <Td>
                      <Input />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={capaian}
                        onChange={(e) => setCapaian(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={subCapaian}
                        onChange={(e) => setSubCapaian(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={jam}
                        onChange={(e) => setJam(e.target.value)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={handleSubmit}>
              Simpan
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const EditFunction = ({ id, pkl_id, no }) => {
  const [capaian, setCapaian] = useState("");
  const [subCapaian, setSubCapaian] = useState("");
  const [jam, setJam] = useState("");
  const [cookies] = useCookies(["jwt_token"]);

  const data_input = {
    capaian: capaian,
    sub_capaian: subCapaian,
    jam: jam,
    status: 1,
    pkl_id: pkl_id,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/kegiatan", {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        response?.data?.body?.map((data) => {
          if (data.pkl_id == pkl_id) {
            if (data.id == id) {
              setCapaian(data.capaian);
              setSubCapaian(data.sub_capaian);
              setJam(data.jam);
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/user/kegiatan/update/${id}`,
        data_input,
        {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data },
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  return (
    <>
      <EditButton onClick={onOpen}>Tambah Rencana</EditButton>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginLeft={"1450px"}>
            <CloseButton color={"#BDCDD6"} onClick={onOpenCancel} />
          </ModalHeader>
          <ModalBody>
            <Box
              marginTop="75px"
              w={"450"}
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Capaian </Th>
                    <Th>Sub Capaian </Th>
                    <Th>Jumlah Jam </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr color="black">
                    <Td>
                      <Input value={no} />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={capaian}
                        onChange={(e) => setCapaian(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={subCapaian}
                        onChange={(e) => setSubCapaian(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={jam}
                        onChange={(e) => setJam(e.target.value)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={handleSubmit}>
              Simpan
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenCancel} onClose={onCloseCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
            <ModalCloseButton color={"#FF0000"} />
            Apakah anda yakin membuang perubahan?
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack spacing={20}>
                <Button
                  bgColor={"#20B95D"}
                  color={"white"}
                  onClick={() => {
                    onCloseCancel();
                    onClose();
                  }}
                  w={70}
                >
                  Ya
                </Button>
                <Button
                  bgColor={"#FF0000"}
                  color={"white"}
                  onClick={onCloseCancel}
                  w={70}
                >
                  Tidak
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
const EditFunctionKehadiran = ({ id, pkl_id, no }) => {
  const [kehadiran, setKehadiran] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [cookies] = useCookies(["jwt_token"]);

  const tanggalwaktu = `${tanggal} ${waktu}:00`;

  const data_input = {
    kehadiran: kehadiran,
    keterangan: keterangan,
    tanggalwaktu: tanggalwaktu,
    status: 1,
    pkl_id: pkl_id,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/kehadiran", {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        response?.data?.body?.map((data) => {
          if (data.pkl_id == pkl_id) {
            if (data.id == id) {
              setKehadiran(data.kehadiran);
              setKeterangan(data.keterangan);
              const datetimeParts = data.tanggalwaktu.split(" ");
              setTanggal(datetimeParts[0]);
              setWaktu(datetimeParts[1]);
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/user/kehadiran/update/${id}`,
        data_input,
        {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data },
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  return (
    <>
      <EditButton onClick={onOpen}>Tambah Rencana</EditButton>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginLeft={"1450px"}>
            <CloseButton color={"#BDCDD6"} onClick={onOpenCancel} />
          </ModalHeader>
          <ModalBody>
            <Box
              marginTop="75px"
              w={"450"}
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Tanggal </Th>
                    <Th>Waktu</Th>
                    <Th>Kehadiran </Th>
                    <Th>Keterangan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr color="black">
                    <Td>
                      <Input value={no} />
                    </Td>
                    <Td>
                      <Input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="time"
                        value={waktu}
                        onChange={(e) => setWaktu(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Select
                        variant="unstyled"
                        border="none"
                        marginBlock={1}
                        value={kehadiran}
                        onChange={(e) => setKehadiran(e.target.value)}
                      >
                        <option>Pilih</option>
                        <option value={1}>Hadir</option>
                        <option value={2}>Sakit</option>
                        <option value={3}>Izin</option>
                        <option value={0}>Tanpa Kehadiran</option>
                      </Select>
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={handleSubmit}>
              Simpan
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenCancel} onClose={onCloseCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
            <ModalCloseButton color={"#FF0000"} />
            Apakah anda yakin membuang perubahan?
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack spacing={20}>
                <Button
                  bgColor={"#20B95D"}
                  color={"white"}
                  onClick={() => {
                    onCloseCancel();
                    onClose();
                  }}
                  w={70}
                >
                  Ya
                </Button>
                <Button
                  bgColor={"#FF0000"}
                  color={"white"}
                  onClick={onCloseCancel}
                  w={70}
                >
                  Tidak
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
function ButtonBoxTambahRencanaLogHarian() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<PlusIcon />}
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#6096B4"
        width={200}
        marginTop={4}
        onClick={onOpen}
      >
        Tambah Rencana
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <TableEdit />
          </ModalBody>
          <ModalFooter>
            <ButtonBoxSimpanLogHarian />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ButtonBoxTambahRencanaKehadiran({ id }) {
  const [kehadiran, setKehadiran] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [cookies] = useCookies(["jwt_token"]);

  console.log(setKehadiran);
  const handleSubmit = (e) => {
    e.preventDefault();
    const tanggalwaktu = `${tanggal} ${waktu}:00`;
    const data = {
      kehadiran: kehadiran,
      keterangan: keterangan,
      tanggalwaktu: tanggalwaktu,
      status: 1,
      pkl_id: id,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/kehadiran/tambah", data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
        setKehadiran("");
        setKeterangan("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<PlusIcon />}
        variant="solid"
        color={"white"}
        fontWeight={"bold"}
        backgroundColor="#6096B4"
        width={200}
        marginTop={4}
        onClick={onOpen}
      >
        Tambah Kehadiran
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            <Box
              marginTop="75px"
              w={"450"}
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Tanggal </Th>
                    <Th>Waktu</Th>
                    <Th>Kehadiran </Th>
                    <Th>Keterangan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr color="black">
                    <Td>
                      <Input />
                    </Td>
                    <Td>
                      <Input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="time"
                        value={waktu}
                        onChange={(e) => setWaktu(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Select
                        variant="unstyled"
                        border="none"
                        marginBlock={1}
                        onChange={(e) => setKehadiran(e.target.value)}
                      >
                        <option>Pilih</option>
                        <option value={1}>Hadir</option>
                        <option value={2}>Sakit</option>
                        <option value={3}>Izin</option>
                        <option value={0}>Tanpa Kehadiran</option>
                      </Select>
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <button className="button-box-2" onClick={handleSubmit}>
              Simpan
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function ButtonBoxVerifikasi({ id, capaian, sub_capaian, jam, pkl_id }) {
  const [cookies] = useCookies(["jwt_token"]);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      capaian: capaian,
      sub_capaian: sub_capaian,
      jam: jam,
      status: "2",
      pkl_id: pkl_id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/user/kegiatan/update/${id}`, data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      variant="solid"
      w="81px"
      height="26px"
      bgColor="#C7F1D8"
      color="#20B95D"
      fontWeight={"bold"}
      _hover={{ background: "#20B95D", color: "#18753D" }}
      onClick={handleClick}
    >
      Verifikasi
    </Button>
  );
}

function ButtonBoxTolak({ id, capaian, sub_capaian, jam, pkl_id }) {
  const [cookies] = useCookies(["jwt_token"]);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      capaian: capaian,
      sub_capaian: sub_capaian,
      jam: jam,
      status: "3",
      pkl_id: pkl_id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/user/kegiatan/update/${id}`, data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      variant="solid"
      w="81px"
      h="26px"
      bgColor="#FFECEC"
      color="#FF0000"
      fontWeight={"bold"}
      _hover={{ background: "#FF5B5B", color: "#7B2121" }}
      onClick={handleClick}
    >
      Tolak
    </Button>
  );
}

function ButtonBoxVerifikasi2({
  id,
  pkl_id,
  tanggalwaktu,
  kehadiran,
  keterangan,
}) {
  const [cookies] = useCookies(["jwt_token"]);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      pkl_id: pkl_id,
      tanggalwaktu: tanggalwaktu,
      kehadiran: kehadiran,
      status: "2",
      keterangan: keterangan,
    };
    axios
      .post(`http://127.0.0.1:8000/api/user/kehadiran/update/${id}`, data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      variant="solid"
      w="81px"
      height="26px"
      bgColor="#C7F1D8"
      color="#20B95D"
      fontWeight={"bold"}
      _hover={{ background: "#20B95D", color: "#18753D" }}
      onClick={handleClick}
    >
      Verifikasi
    </Button>
  );
}

function ButtonBoxTolak2({ id, pkl_id, tanggalwaktu, kehadiran, keterangan }) {
  const [cookies] = useCookies(["jwt_token"]);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      pkl_id: pkl_id,
      tanggalwaktu: tanggalwaktu,
      kehadiran: kehadiran,
      status: "3",
      keterangan: keterangan,
    };
    axios
      .post(`http://127.0.0.1:8000/api/user/kehadiran/update/${id}`, data, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      variant="solid"
      w="81px"
      h="26px"
      bgColor="#FFECEC"
      color="#FF0000"
      fontWeight={"bold"}
      _hover={{ background: "#FF5B5B", color: "#7B2121" }}
      onClick={handleClick}
    >
      Tolak
    </Button>
  );
}

export {
  ButtonBoxDownload,
  ButtonBoxKirim,
  ButtonBoxUbah,
  ButtonBoxSimpanProfile,
  ButtonBoxSimpanRencanaKegiatan,
  ButtonBoxSimpanLogHarian,
  ButtonBoxDetailRencanaKegiatan,
  ButtonBoxDetailKehadiran,
  ButtonBoxDetailLogHarianMahasiswa,
  ButtonBoxDetailLogHarianMahasiswaDosenDetail,
  ButtonBoxDetailLogHarianDPLDetail,
  ButtonBoxDetailPenilaian,
  ButtonBoxTambahRencana,
  ButtonBoxTambahRencanaLogHarian,
  ButtonBoxTambahRencanaKehadiran,
  ButtonBoxVerifikasi,
  ButtonBoxTolak,
  ButtonBoxVerifikasi2,
  ButtonBoxTolak2,
  ButtonBoxExport,
  EditFunction,
  EditFunctionKehadiran,
  ButtonBox,
};
