import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, Button, Text } from "@chakra-ui/react";
import "./RegisterRoleBox.css";
import { useNavigate } from "react-router-dom";
import Header from '../login-page/header'

function RoleBox() {
  const [role, setRole] = useState("");
  const clickChange = (event) => setRole(event.target.value);
  const navigate = useNavigate()
  const navigatepage = () => {
    if (role === 'mahasiswa') {
      navigate('/register-mahasiswa')
    }
    else if (role === 'dosen') {
      navigate('/register-dosen')
    }
    else if (role === 'dpl') {
      navigate('/register-dpl')
    }
  }
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header></Header>
      <Center>
        <AbsoluteCenter>
          <Box className="box" maxW="sm" maxH="sm" p="25px">
            <SimpleGrid spacingY="20px">
              <Text className="header-cardbox">Select Role</Text>
              {role === 'mahasiswa' ? (
                <Button className="option-box" value="mahasiswa" bg="#bdcdd6" onClick={clickChange}>
                  Mahasiswa
                </Button>
              ) : (
                <Button className="option-box" value="mahasiswa" bg="#fffff" onClick={clickChange}>
                  Mahasiswa
                </Button>
              )}
              {role === 'dosen' ? (
                <Button className="option-box" value="dosen" bg="#bdcdd6" onClick={clickChange}>
                  Dosen
                </Button>
              ) : (
                <Button className="option-box" value="dosen" bg="#fffff" onClick={clickChange}>
                  Dosen
                </Button>
              )}
              {role === 'dpl' ? (
                <Button className="option-box" value="dpl" bg="#bdcdd6" onClick={clickChange}>
                  Dosen Pembimbing
                </Button>
              ) : (
                <Button className="option-box" value="dpl" bg="#fffff" onClick={clickChange}>
                  Dosen Pembimbing
                </Button>
              )}
              <Button className="button-box" color="#f5f5f5" backgroundColor="#bdcdd6" onClick={navigatepage}>
                Next
              </Button>
            </SimpleGrid>
          </Box>
        </AbsoluteCenter>
      </Center>
    </Box>
  );
}

export default RoleBox;
