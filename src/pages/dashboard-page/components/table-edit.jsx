import React, { useState } from "react";
import { Box, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

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

export default TableEdit;
