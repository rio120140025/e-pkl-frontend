import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, Button, Text } from "@chakra-ui/react";
import "./RegisterRoleBox.css";

function RoleBox() {
  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" maxH="sm" p="25px">
          <SimpleGrid spacingY="20px">
            <Text className="header-cardbox">Select Role</Text>
            <Box>
              <Button className="option-box" bg={"#fffff"}>
                Mahasiswa
              </Button>
            </Box>
            <Box>
              <Button className="option-box" bg={"#fffff"}>
                Dosen
              </Button>
            </Box>
            <Box>
              <Button className="option-box" bg={"#fffff"}>
                Dosen Pembimbing
              </Button>
            </Box>
            <Button
              className="button-box"
              color={"#f5f5f5"}
              backgroundColor={"#bdcdd6"}
            >
              Next
            </Button>
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}
export default RoleBox;
