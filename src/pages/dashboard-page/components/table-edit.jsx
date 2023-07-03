import React from "react";
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
} from "@chakra-ui/react";

const TableEdit = () => {
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
