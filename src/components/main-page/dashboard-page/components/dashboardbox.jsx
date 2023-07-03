import React from "react";
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";

import ButtonBox from "../../components/button";
import TableComponent from "./table";

function DashboardBox() {
  return (
    <Box

      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="md"
      fontSize="15px"
    >
      <Flex direction="column " mx="30px" my="10px" gap="19" >
        <Box>
          <Text
            fontWeight={"bold"}
            paddingBottom="10px"
          >
            Download Buku Panduan PKL
          </Text>
          <ButtonBox name="Download" />
        </Box>
        <Box>
          <Text
            fontWeight={"bold"}
            paddingBottom="10px"
          >
            Mahasiswa Bimbingan PKL
          </Text>
          <TableComponent />
        </Box>
      </Flex>
    </Box>
  );
}

export default DashboardBox;
