import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

import "../login-page/box.css";

import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";
import ButtonBoxSign from "../login-page/button-box";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterBoxDPL() {
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
        navigate("/");
        console.log(loginData)
      })
      .catch(error => {
        console.error(error.response.data);
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
            <ButtonBoxSign buttonType='Sign In' />
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}
export default RegisterBoxDPL;
