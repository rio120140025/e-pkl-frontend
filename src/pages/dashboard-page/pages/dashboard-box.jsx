import React, { useRef, useEffect } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { ButtonBoxDownload } from "../components/button-box";
import TableDashboard from "../components/table-dashboard";

function DashboardBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    const updateBoxHeight = () => {
      const { height } = boxRef.current.getBoundingClientRect();
      boxRef.current.style.height = `${height + 25}px`;
    };

    window.addEventListener("resize", updateBoxHeight);
    updateBoxHeight();

    return () => {
      window.removeEventListener("resize", updateBoxHeight);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      position="absolute"
      marginTop="175px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      fontSize="15px"
    >
      <SimpleGrid>
        <Text
          position="absolute"
          fontWeight="bold"
          marginTop={2}
          marginLeft="30.5px"
        >
          Download Buku Panduan PKL
        </Text>
        <ButtonBoxDownload />
        <Text
          position="absolute"
          fontWeight="bold"
          marginTop={100}
          marginLeft="30.5px"
        >
          Mahasiswa Bimbingan PKL
        </Text>
        <TableDashboard />
      </SimpleGrid>
    </Box>
  );
}

export default DashboardBox;
