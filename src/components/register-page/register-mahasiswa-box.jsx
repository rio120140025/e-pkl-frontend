import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../login-page/box.css";

import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";
import ButtonBoxSign from "../login-page/button-box";



function RegisterBoxMahasiswa() {
  const toast = useToast()
  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    })
  }

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [notelp, setNotelp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const loginData = {
      nama: nama,
      email: email,
      password: password,
      roles_id: "1",
      lokasi: lokasi,
      nim: nim,
      notelp: notelp,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/register", loginData)
      .then(response => {
        callToast("Berhasil Membuat Akun", 'success')
        navigate("/");
        console.log(loginData)
      })
      .catch(error => {
        console.error(error.response.data.errors.email);
        callToast(error.response.data.reason.email, 'error')
      });
  };

  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" p="25px">
          <SimpleGrid spacingY="5px">
            <Box>
              Nama
              <InputBox input={nama} handleSet={(e) => setNama(e.target.value)} />
            </Box>
            <Box>
              Email
              <InputBox input={email} handleSet={(e) => setEmail(e.target.value)} />
            </Box>
            <Box>
              NIM
              <InputBox input={nim} handleSet={(e) => setNim(e.target.value)} />
            </Box>
            <Box>
              Lokasi PKL
              <InputBox input={lokasi} handleSet={(e) => setLokasi(e.target.value)} />
            </Box>
            <Box>
              Nomor Telepon
              <InputBox input={notelp} handleSet={(e) => setNotelp(e.target.value)} />
            </Box>
            <Box>
              Password
              <PasswordInput input={password} handleSetPassword={(e) => setPassword(e.target.value)} />
            </Box>
            <ButtonBoxSign handle={() => handleRegister()} buttonType='Sign Up' />
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}
export default RegisterBoxMahasiswa;
