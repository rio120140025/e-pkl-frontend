import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import "../../../components/login-page/components/box.css";

import InputBox from "../../login-page/components/input-box";
import PasswordInput from "../../login-page/components/password";
import ButtonBoxSign from "../../login-page/components/button-box";
import { useNavigate } from "react-router-dom";


function RegisterBoxDosen() {
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
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [instansi, setInstansi] = useState("");


  const navigate = useNavigate();

  const handleRegister = () => {
    const loginData = {
      name: nama,
      email: email,
      roles_id: "3",
      nip: nip,
      password: password,
      jabatan: jabatan,
      instansi: instansi

    };
    console.log(loginData)

    axios
      .post("http://127.0.0.1:8000/api/user/register", loginData)
      .then(response => {
        callToast("Berhasil Membuat Akun", 'success')
        navigate("/");
        console.log(loginData)
      })
      .catch(error => {
        console.error(error.response);
        if (error.response.data.errors.email !== null) {
          callToast(error.response.data.errors.email, "error");
        }
        if (error.response.data.errors.nip !== null) {
          callToast(error.response.data.errors.nip, "error");
        }
        if (error.response.data.errors.password !== null) {
          callToast(error.response.data.errors.password, "error");
        }
        if (error.response.data.errors.jabatan !== null) {
          callToast(error.response.data.errors.jabatan, "error");
        }
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
              NRK/NIP
              <InputBox input={nip} handleSet={(e) => setNip(e.target.value)} />
            </Box>
            <Box>
              Jabatan
              <InputBox input={jabatan} handleSet={(e) => setJabatan(e.target.value)} />
            </Box>
            <Box>
              Instansi
              <InputBox input={instansi} handleSet={(e) => setInstansi(e.target.value)} />
            </Box>
            <Box>
              Email
              <InputBox input={email} handleSet={(e) => setEmail(e.target.value)} />
            </Box>
            <Box>
              Password
              <PasswordInput password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
            </Box>
            <ButtonBoxSign handle={() => handleRegister()} buttonType='Sign Up' />
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center >
  );
}
export default RegisterBoxDosen;
