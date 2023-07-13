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
  Select,
  Flex,
  Button,
  useToast,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";


const TableEdit = (props) => {
  const [no, setNo] = useState('')
  const [kegiatan, setKegiatan] = useState(props.logHarian_data?.kegiatan || "");
  const [materi, setMateri] = useState(props.logHarian_data?.materi || "")
  const [prosedur, setProsedur] = useState(props.logHarian_data?.prosedur || "")
  const [hasil, setHasil] = useState(props.logHarian_data?.hasil || "")
  const [waktu, setWaktu] = useState(props.logHarian_data?.waktu || "")
  const [alat, setAlat] = useState(props.logHarian_data?.alatbahan || "")
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const toast = useToast();

  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    console.log(cookies?.jwt_token?.data)
    axios
      .get("http://127.0.0.1:8000/api/user/jurnal/data", {
        headers: { Authorization: "Bearer " + (cookies?.jwt_token?.data ?? "") },
      })
      .then((response) => {
        const dataLength = response.data.body.length
        console.log(dataLength)
        if (dataLength == undefined) {
          setNo(1)
        }
        else {
          setNo(dataLength + 1)
        }


      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  console.log("ini props", props.id)
  const simpan = () => {
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

    }
    console.log(updateData)
    if (props.isEdit == "yes") {
      axios
        .post(`http://127.0.0.1:8000/api/user/jurnal/update/${props.id}`, updateData, {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data }
        })
        .then(response => {
          async function notif() {
            await callToast("Berhasil Mengubah Log Harian", 'success')
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
          notif()
        })
        .catch(error => {
          Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        });
    }
    else {
      axios
        .post(`http://127.0.0.1:8000/api/user/jurnal`, updateData, {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data }
        })
        .then(response => {
          async function notif() {
            await callToast("Berhasil Menambah Log Harian", 'success')
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
          notif()
        })
        .catch(error => {
          Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        });
    }
  }
  return (
    <Box
      marginTop="75px"
      w={"450"}
      borderRadius="5"
      bgColor="#F9FAFC"
      boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
    >
      <Flex direction='column'>
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
        <Button onClick={simpan}>Simpan</Button>
      </Flex>
    </Box>
  );
};


function TableEditDPL(props) {
  const [no, setNo] = useState('')
  const [kegiatan, setKegiatan] = useState(props.logHarian_data?.kegiatan || "");
  const [materi, setMateri] = useState(props.logHarian_data?.materi || "")
  const [prosedur, setProsedur] = useState(props.logHarian_data?.prosedur || "")
  const [hasil, setHasil] = useState(props.logHarian_data?.hasil || "")
  const [waktu, setWaktu] = useState(props.logHarian_data?.waktu || "")
  const [alat, setAlat] = useState(props.logHarian_data?.alatbahan || "")
  const [komentar, setKomentar] = useState(props.logHarian_data?.komentar || "")
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const toast = useToast();

  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }
  const simpan = () => {
    let updateData = {
      pkl_id: props.logHarian_data?.pkl_id || parseInt(props.pkl_id),
      kegiatan: kegiatan,
      prosedur: prosedur,
      alatbahan: alat,
      waktu: waktu,
      materi: materi,
      hasil: hasil,
      komentar: komentar,
      status: props.logHarian_data?.status || 1,

    }
    console.log(updateData)
    if (props.isEdit == "yes") {
      axios
        .post(`http://127.0.0.1:8000/api/user/jurnal/update/${props.logHarian_data.id}`, updateData, {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data }
        })
        .then(response => {
          async function notif() {
            await callToast("Berhasil Mengubah Log Harian", 'success')
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
          notif()
        })
        .catch(error => {
          Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        });
    }
    else {
      axios
        .post(`http://127.0.0.1:8000/api/user/jurnal`, updateData, {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data }
        })
        .then(response => {
          async function notif() {
            await callToast("Berhasil Menambah Log Harian", 'success')
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
          notif()
        })
        .catch(error => {
          Object.keys(error?.response?.data?.errors).forEach(function (key, index) {
            callToast(error.response.data.errors[key], 'error');
          });
        });
    }
  }
  return (
    <Box
      marginTop="75px"
      w={"450"}
      borderRadius="5"
      bgColor="#F9FAFC"
      boxShadow="0 0 0 1px rgba(152, 161, 178, 0.1), 0 1px 4px rgba(69, 75, 87, 0.12), 0 0 2px rgba(0, 0, 0, 0.08)"
    >
      <Flex direction='column'>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Materi</Th>
              <Th>Prosedur</Th>
              <Th>Hasil Pelaksanaan</Th>
              <Th>Komentar</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr color="black">
              <Td>
                {no}
              </Td>
              <Td>
                <Text value={materi} onChange={(e) => { setMateri(e.target.value) }} />
              </Td>
              <Td>
                <Text value={prosedur} onChange={(e) => { setProsedur(e.target.value) }} />
              </Td>
              <Td>
                <Text value={hasil} onChange={(e) => { setHasil(e.target.value) }} />
              </Td>
              <Td>
                <Input value={komentar} onChange={(e) => { setKomentar(e.target.value) }} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={simpan}>Simpan</Button>
      </Flex>
    </Box>
  )
}


const TableEditKehadiran = () => {
  return (
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
            <Th colSpan={3} textAlign={"center"}>
              Waktu{" "}
            </Th>
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
              <Input type="date" />
            </Td>
            <Td>
              <Input type="time" />
            </Td>
            <Td>-</Td>
            <Td>
              <Input type="time" />
            </Td>
            <Td>
              <Select variant="unstyled" border="none" marginBlock={1}>
                <option value={1}>Hadir</option>
                <option value={2}>Sakit</option>
                <option value={3}>Izin</option>
                <option value={4}>Tanpa Kehadiran</option>
              </Select>
            </Td>
            <Td>
              <Input />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

const TableEditPenilaian = () => {
  return (
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
            <Th>Pengetahuan </Th>
            <Th>Pelaksanaan </Th>
            <Th>Kerja Sama </Th>
            <Th>Kreativitas </Th>
            <Th>Kedisplinan </Th>
            <Th>Sikap </Th>
            <Th>Rata-rata </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr color="black">
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
export { TableEdit, TableEditKehadiran, TableEditPenilaian, TableEditDPL };
