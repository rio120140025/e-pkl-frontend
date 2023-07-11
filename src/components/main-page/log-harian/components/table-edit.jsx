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
  Select,
  Flex,
  Button
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";


const TableEdit = () => {
  const [kegiatan, setKegiatan] = useState('')
  const [materi, setMateri] = useState('')
  const [prosedur, setProsedur] = useState('')
  const [hasil, setHasil] = useState('')
  const [waktu, setWaktu] = useState('')
  const [alat, setAlat] = useState('')
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const id = localStorage.getItem('id');
  const simpan = () => {
    let updateData = {
      pkl_id: id,
      kegiatan: kegiatan,
      prosedur: prosedur,
      alatbahan: alat,
      waktu: waktu,
      materi: materi,
      hasil: hasil,
      komentar: "test",
      status: "test"

    }
    console.log(updateData)
    axios
      .post(`http://127.0.0.1:8000/api/user/jurnal`, updateData, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data }
      })
      .then(response => {
        // callToast("Berhasil Mengubah Data", 'success')
        console.log("data sudah terkirim", updateData)
      })
      .catch(error => {
        console.log(error.response);
        // callToast(error.response.data.reason, 'error')
      });
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
                <Input />
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
                <Input value={waktu} onChange={(e) => { setWaktu(e.target.value) }} />
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
export { TableEdit, TableEditKehadiran, TableEditPenilaian };
