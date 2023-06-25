import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import "../login-page/box.css";

import InputBox from "../login-page/input-box";
import PasswordInput from "../login-page/password";
import ButtonBoxSign from "../login-page/button-box";
import { useNavigate } from "react-router-dom";


function RegisterBoxDosen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    const loginData = {
      name: nama,
      email: email,
      roles_id: "2",
      nip: nip,
      password: password
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
    </Center>
  );
}
export default RegisterBoxDosen;
