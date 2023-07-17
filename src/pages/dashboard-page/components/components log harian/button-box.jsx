import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  HStack,
  Text,
  useToast,
  Box,
  Flex,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Input,
  Image,
  Center,
} from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../../assets/icon-plus.svg";
import axios from "axios";
import { useCookies } from "react-cookie";
import closeButton from '../../../../assets/close vector.svg'


function ButtonBoxTambahRencanaLogHarian(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [no, setNo] = useState('');
  const [kegiatan, setKegiatan] = useState(props.logHarian_data?.kegiatan || "");
  const [materi, setMateri] = useState(props.logHarian_data?.materi || "");
  const [prosedur, setProsedur] = useState(props.logHarian_data?.prosedur || "");
  const [hasil, setHasil] = useState(props.logHarian_data?.hasil || "");
  const [waktu, setWaktu] = useState(props.logHarian_data?.waktu || "");
  const [alat, setAlat] = useState(props.logHarian_data?.alatbahan || "");
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const toast = useToast();

  const {
    isOpen: isOpenQuitTambah,
    onOpen: onOpenQuitTambah,
    onClose: onCloseQuitTambah,
  } = useDisclosure();

  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    console.log(cookies?.jwt_token?.data);
    async function waitGetData() {
      await axios
        .get("http://127.0.0.1:8000/api/user/jurnal/data", {
          headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
        })
        .then((response) => {
          console.log('pkl_id', props.pkl_id);
          console.log('response.data.body', response.data.body);
          const filterData = response.data.body.filter((data) => data.pkl_id == props.pkl_id);
          console.log("ini filter data", filterData);
          console.log("filterData.length", filterData.length);

          if (filterData.length == '') {
            setNo(1);
          } else {
            setNo(filterData.length + 1);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    waitGetData()
  }, []);

  console.log('no', no);

  const fetchData = async () => {
    try {
      if (no !== '') {
        let updateData = {
          pkl_id: props.logHarian_data?.pkl_id || parseInt(props.pkl_id),
          kegiatan: kegiatan,
          prosedur: prosedur,
          alatbahan: alat,
          waktu: waktu,
          materi: materi,
          hasil: hasil,
          komentar: props.logHarian_data?.komentar || "Akan diisi oleh Dosen Lapangan",
          status: props.logHarian_data?.status || 1,
        };

        if (props.isEdit === "yes") {
          await axios.post(
            `http://127.0.0.1:8000/api/user/jurnal/update/${props.id}`,
            updateData,
            {
              headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            }
          );

          callToast("Berhasil Mengubah Log Harian", 'success');
          setTimeout(() => {
            window.location.reload();
          }, 0);
        } else {
          await axios.post(
            `http://127.0.0.1:8000/api/user/jurnal`,
            updateData,
            {
              headers: { Authorization: "Bearer " + cookies.jwt_token.data },
            }
          );

          callToast("Berhasil Menambah Log Harian", 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      if (error?.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach(function (key) {
          callToast(error.response.data.errors[key], 'error');
        });
      }
    }
  };

  const Simpan = async () => {
    await fetchData();
  };

  useEffect(() => {
    console.log(cookies?.jwt_token?.data)
    axios
      .get("http://127.0.0.1:8000/api/user/jurnal/data", {
        headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
      })
      .then((response) => {
        console.log('pkl_id', props.pkl_id)
        console.log('response.data.body', response.data.body)
        const filterData = response.data.body.filter((data) => data.pkl_id == props.pkl_id)
        console.log("ini filter data", filterData)
        console.log("filterData.length", filterData.length)

        if (filterData.length === 0) {
          setNo(1)
        }
        else {
          setNo(filterData.length + 1)
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  if (no === '') {
    return null; // Render nothing until `no` is updated
  }
  function CloseModal() {
    onClose();
    onCloseQuitTambah();
  }
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
      <Modal isOpen={isOpen} size={"1"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image src={closeButton} onClick={onOpenQuitTambah} float='right' pt='13px' pr='12px' />
            <Box
              marginTop="75px"
              w={"450"}
              borderRadius="5"
              bgColor="#F9FAFC"
              boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
            >
              <Flex direction='column' gap='65px'>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Kegiatan </Th>
                      <Th>Materi</Th>
                      <Th>Prosedur</Th>
                      <Th>Hasil Pelaksanaan</Th>
                      <Th>Waktu Pelaksanaan</Th>
                      <Th>Alat dan Bahan</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color="black">
                      <Td>
                        {no}
                      </Td>
                      <Td>
                        <Input value={kegiatan} onChange={(e) => { setKegiatan(e.target.value) }} />
                      </Td>
                      <Td>
                        <Input value={materi} onChange={(e) => { setMateri(e.target.value) }} />
                      </Td>
                      <Td>
                        <Input value={prosedur} onChange={(e) => { setProsedur(e.target.value) }} />
                      </Td>
                      <Td>
                        <Input value={hasil} onChange={(e) => { setHasil(e.target.value) }} />
                      </Td>
                      <Td>
                        <Input value={waktu} type="date" onChange={(e) => { setWaktu(e.target.value) }} />
                      </Td>
                      <Td>
                        <Input value={alat} onChange={(e) => { setAlat(e.target.value) }} />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Box >
          </ModalBody>
          <ModalFooter>
            <Button
              className="button-box-2" bg='#93BFCF' color='#FFFFFF'
              onClick={Simpan}
            >
              <Text
                color='#FFF'
                textAlign='center'
                fontSize='14px'
                fontStyle='normal'
                fontWeight='700'
                lineHeight='16px'
              >
                Simpan
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenQuitTambah} onClose={onCloseQuitTambah} isLazy={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={10} textAlign={"center"} fontWeight={"bolder"}>
            <ModalCloseButton color={"#FF0000"} />
            Apakah anda yakin membuang Log Harian?
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack spacing={20}>
                <Button
                  bgColor={"#20B95D"}
                  color={"white"}
                  onClick={CloseModal}
                  w={70}
                >
                  Ya
                </Button>
                <Button
                  bgColor={"#FF0000"}
                  color={"white"}
                  onClick={onCloseQuitTambah}
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
}


export {
  ButtonBoxTambahRencanaLogHarian,
};
