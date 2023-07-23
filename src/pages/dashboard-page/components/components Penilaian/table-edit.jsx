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
  Flex,
  HStack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  Center,
  Text,
  useToast,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import trash from "../../../../assets/iconamoon_trash-duotone.svg"
import edit from "../../../../assets/pepicons-pop_pen.svg"

function ButtonBeriNilai(props) {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } =
    useDisclosure();
  const [pengetahuan, setPengetahuan] = useState('');
  const [pelaksanaan, setPelaksanaan] = useState('');
  const [kerjaSama, setKerjaSama] = useState('');
  const [kreativitas, setKreativitas] = useState('');
  const [kedisplinan, setKedisplinan] = useState('');
  const [sikap, setSikap] = useState('');
  const [rata, setRata] = useState('');
  const [mulai, setMulai] = useState(null); // Set initial value to null
  const [selesai, setSelesai] = useState(null); // Set initial value to null
  const [cookies, setCookie] = useCookies(['jwt_token']);


  function handleDateChange(e, setter) {
    const dateValue = e.target.value;
    const newDate = dateValue ? new Date(dateValue) : null;
    setter(newDate);
  }

  const formatDate = (date) => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const calculateAverage = () => {
    const pengetahuanValue = parseInt(pengetahuan) || 0;
    const pelaksanaanValue = parseInt(pelaksanaan) || 0;
    const kerjaSamaValue = parseInt(kerjaSama) || 0;
    const kreativitasValue = parseInt(kreativitas) || 0;
    const kedisplinanValue = parseInt(kedisplinan) || 0;
    const sikapValue = parseInt(sikap) || 0;

    const total = pengetahuanValue + pelaksanaanValue + kerjaSamaValue + kreativitasValue + kedisplinanValue + sikapValue;
    const average = total / 6;
    setRata(parseInt(average));
  };

  useEffect(() => {
    calculateAverage();
  }, [pengetahuan, pelaksanaan, kerjaSama, kreativitas, kedisplinan, sikap]);

  let input_nilai = {
    pkl_id: props.pkl_id,
    tgl_mulai: mulai ? mulai.toISOString().split('T')[0] : null, // Check if mulai is null
    tgl_selesai: selesai ? selesai.toISOString().split('T')[0] : null, // Check if selesai is null
    pengetahuan: pengetahuan,
    pelaksanaan: pelaksanaan,
    kerjasama: kerjaSama,
    kreativitas: kreativitas,
    kedisiplinan: kedisplinan,
    sikap: sikap,
    rerata: rata,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/penilaian', {
          headers: { Authorization: 'Bearer ' + (cookies?.jwt_token?.data ?? '') },
        });

        const data = response?.data?.body || [];

        for (const item of data) {
          if (item.pkl_id == props.pkl_id) {
            console.log('response.data.body', data);
            setPengetahuan(item.pengetahuan);
            setMulai(new Date(item.tgl_mulai));
            setSelesai(new Date(item.tgl_selesai));
            setRata(item.rerata);
            setPelaksanaan(item.pelaksanaan);
            setKerjaSama(item.kerjasama);
            setKreativitas(item.kreativitas);
            setKedisplinan(item.kedisiplinan);
            setSikap(item.sikap);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toast = useToast();

  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  function Submit() {

    axios
      .post('http://127.0.0.1:8000/api/user/penilaian/tambah', input_nilai, {
        headers: { Authorization: 'Bearer ' + (cookies?.jwt_token?.data ?? '') },
      })
      .then((response) => {
        async function myFunction() {
          await callToast('Berhasil Menambahkan Nilai', 'success');
          window.location.reload();
        }

        myFunction();
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error?.response?.data?.errors) {
          Object.keys(error.response.data.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        }
      });
  }

  return (

    <Flex>
      <Button
        variant="solid"
        w="81px"
        h="26px"
        cursor="pointer"
        textAlign="center"
        fontWeight="bold"
        bgColor="#FFF5D2"
        borderRadius={5}
        onClick={onOpenEdit}
        color="#FFD02C"
      >
        Beri Nilai
      </Button>

      < Modal isOpen={isOpenEdit} onClose={onCloseEdit} size={"1"} >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color={"#BDCDD6"} />
            {/* <TableEditPenilaian no={props.no} pkl_id={props.pkl_id} /> */}
            <Box
              marginTop="75px"
              w="450"
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Flex direction="column" gap="65px">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Pengetahuan </Th>
                      <Th>Pelaksanaan </Th>
                      <Th>Kerja Sama </Th>
                      <Th>Kreativitas </Th>
                      <Th>Kedisplinan </Th>
                      <Th>Sikap </Th>
                      <Th>Waktu Mulai </Th>
                      <Th>Waktu Selesai </Th>
                      <Th>Rata-rata </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color="black">
                      <Td>
                        <Text>{props.no}</Text>
                      </Td>
                      <Td>
                        <Input value={pengetahuan} onChange={(e) => setPengetahuan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={pelaksanaan} onChange={(e) => setPelaksanaan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kerjaSama} onChange={(e) => setKerjaSama(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kreativitas} onChange={(e) => setKreativitas(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kedisplinan} onChange={(e) => setKedisplinan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={sikap} onChange={(e) => setSikap(e.target.value)} />
                      </Td>
                      <Td>
                        <Input
                          value={mulai ? formatDate(mulai) : ""}
                          type="date"
                          onChange={(e) => handleDateChange(e, setMulai)}
                        />
                      </Td>
                      <Td>
                        <Input
                          value={selesai ? formatDate(selesai) : ""}
                          type="date"
                          onChange={(e) => handleDateChange(e, setSelesai)}
                        />
                      </Td>
                      <Td>
                        {/* <Input value={rata} onChange={(e) => setRata(e.target.value)} /> */}
                        <Text>{rata}</Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              className="button-box-2" bg='#93BFCF' color='#FFFFFF'
              onClick={Submit}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </Flex>
  )
}

const ButtonEditandDelete = (props) => {
  const [cookies, setCookie] = useCookies(['jwt_token']);
  const toast = useToast();
  let blm_dibuat = false;
  const [pengetahuan, setPengetahuan] = useState('');
  const [pelaksanaan, setPelaksanaan] = useState('');
  const [kerjaSama, setKerjaSama] = useState('');
  const [kreativitas, setKreativitas] = useState('');
  const [kedisplinan, setKedisplinan] = useState('');
  const [sikap, setSikap] = useState('');
  const [rata, setRata] = useState('');
  const [mulai, setMulai] = useState(null); // Set initial value to null
  const [selesai, setSelesai] = useState(null); // Set initial value to null

  function handleDateChange(e, setter) {
    const dateValue = e.target.value;
    const newDate = dateValue ? new Date(dateValue) : null;
    setter(newDate);
  }

  const formatDate = (date) => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const calculateAverage = () => {
    const pengetahuanValue = parseFloat(pengetahuan) || 0;
    const pelaksanaanValue = parseFloat(pelaksanaan) || 0;
    const kerjaSamaValue = parseFloat(kerjaSama) || 0;
    const kreativitasValue = parseFloat(kreativitas) || 0;
    const kedisplinanValue = parseFloat(kedisplinan) || 0;
    const sikapValue = parseFloat(sikap) || 0;

    const total = pengetahuanValue + pelaksanaanValue + kerjaSamaValue + kreativitasValue + kedisplinanValue + sikapValue;
    const average = total / 6;
    setRata(parseInt(average));
  };

  useEffect(() => {
    calculateAverage();
  }, [pengetahuan, pelaksanaan, kerjaSama, kreativitas, kedisplinan, sikap]);

  let input_nilai = {
    pkl_id: props.pkl_id,
    tgl_mulai: mulai ? mulai.toISOString().split('T')[0] : null,
    tgl_selesai: selesai ? selesai.toISOString().split('T')[0] : null,
    rerata: rata,
    pengetahuan: pengetahuan,
    pelaksanaan: pelaksanaan,
    kerjasama: kerjaSama,
    kreativitas: kreativitas,
    kedisiplinan: kedisplinan,
    sikap: sikap,
  };

  useEffect(() => {
    let found = false;
    axios
      .get('http://127.0.0.1:8000/api/user/penilaian', {
        headers: { Authorization: 'Bearer ' + (cookies?.jwt_token?.data ?? '') },
      })
      .then((response) => {
        response?.data?.body?.map((data) => {
          if (data.pkl_id === props.pkl_id && found === false) {
            console.log('response.data.body', response.data.body);
            setPengetahuan(data.pengetahuan);
            setMulai(new Date(data.tgl_mulai));
            setSelesai(new Date(data.tgl_selesai));
            setRata(data.rerata);
            setPelaksanaan(data.pelaksanaan);
            setKerjaSama(data.kerjasama);
            setKreativitas(data.kreativitas);
            setKedisplinan(data.kedisiplinan);
            setSikap(data.sikap);
            found = true;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function Submit() {
    axios
      .post(`http://127.0.0.1:8000/api/user/penilaian/update/${props.penilaian_id}`, input_nilai, {
        headers: { Authorization: 'Bearer ' + (cookies?.jwt_token?.data ?? '') },
      })
      .then((response) => {
        console.log('bentuk input nilai', input_nilai);
        async function myFunction() {
          await callToast('Berhasil Mengubah Nilai', 'success');
          window.location.reload();
        }

        myFunction();
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error?.response?.data?.errors) {
          Object.keys(error.response.data.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        }
      });
  }
  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const handleOpenEdit = () => {
    onOpenEdit();
  };

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  function handleDelete() {
    console.log('ini id pkl', props.pkl_id);
    setIsConfirmationOpen(true);
  }
  console.log("nilai", props.penilaian_id)
  function handleConfirmDelete() {
    axios
      .post(`http://127.0.0.1:8000/api/user/penilaian/delete/${props.penilaian_id}`, null, {
        headers: { Authorization: 'Bearer ' + (cookies?.jwt_token?.data ?? '') },
      })
      .then((response) => {
        callToast('Berhasil Menghapus Nilai', 'success');
        window.location.reload();
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          Object.keys(error.response.data.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], "error");
          });
        }
      });
  }

  function handleCancelDelete() {
    setIsConfirmationOpen(false);
  }
  console.log('ada nilai gk', props.isNilaiExsist)
  return (
    <Box >
      <Flex>
        {props.isNilaiExsist == undefined ? null :
          <Image onClick={handleOpenEdit} variant="ghost" src={edit} alt="Edit" boxSize="24px" boxShadow="none" opacity={0.5} />
        }


        <Image onClick={handleDelete} variant="ghost" src={trash} alt="Trash" boxSize="24px" boxShadow="none" opacity={0.5} />
      </Flex>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="1">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton color="#BDCDD6" />
            {/* <TableEditPenilaian no={props.no} pkl_id={props.pkl_id} status={blm_dibuat} penilaian_id={props.penilaian_id} /> */}
            <Box
              marginTop="75px"
              w="450"
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Flex direction="column" gap="65px">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Pengetahuan </Th>
                      <Th>Pelaksanaan </Th>
                      <Th>Kerja Sama </Th>
                      <Th>Kreativitas </Th>
                      <Th>Kedisplinan </Th>
                      <Th>Sikap </Th>
                      <Th>Waktu Mulai </Th>
                      <Th>Waktu Selesai </Th>
                      <Th>Rata-rata </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color="black">
                      <Td>
                        <Text>{props.no}</Text>
                      </Td>
                      <Td>
                        <Input value={pengetahuan} onChange={(e) => setPengetahuan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={pelaksanaan} onChange={(e) => setPelaksanaan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kerjaSama} onChange={(e) => setKerjaSama(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kreativitas} onChange={(e) => setKreativitas(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={kedisplinan} onChange={(e) => setKedisplinan(e.target.value)} />
                      </Td>
                      <Td>
                        <Input value={sikap} onChange={(e) => setSikap(e.target.value)} />
                      </Td>
                      <Td>
                        <Input
                          value={mulai ? formatDate(mulai) : ""}
                          type="date"
                          onChange={(e) => handleDateChange(e, setMulai)}
                        />
                      </Td>
                      <Td>
                        <Input
                          value={selesai ? formatDate(selesai) : ""}
                          type="date"
                          onChange={(e) => handleDateChange(e, setSelesai)}
                        />
                      </Td>
                      <Td>
                        {/* <Input value={rata} onChange={(e) => setRata(e.target.value)} /> */}
                        <Text>{rata}</Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter><Button
            className="button-box-2" bg='#93BFCF' color='#FFFFFF'
            onClick={Submit}>
            Simpan
          </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isConfirmationOpen} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
            <ModalCloseButton color={"#FF0000"} />
            Apakah yakin menghapus penilaian?
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
                  onClick={handleCancelDelete}
                  w={70}
                >
                  Tidak
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export { ButtonBeriNilai, ButtonEditandDelete };