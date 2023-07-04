import React from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

import "../../login-page/components/box.css";

import InputBox from "../../login-page/components/input-box";
import PasswordInput from "../../login-page/components/password";
import { ButtonBoxSignIn } from "../../login-page/components/button-box";

function RegisterBoxMahasiswa() {
  const toast = useToast();
  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
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
      name: nama,
      email: email,
      password: password,
      roles_id: "1",
      lokasi: lokasi,
      nim: nim,
      notelp: notelp,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/register", loginData)
      .then((response) => {
        callToast("Berhasil Membuat Akun", "success");
        navigate("/");
      })
      .catch((error) => {
        console.error(error.response.data.errors);
        if (error.response.data.errors.email !== null) {
          callToast(error.response.data.errors.email, "error");
        }
        if (error.response.data.errors.nim !== null) {
          callToast(error.response.data.errors.nim, "error");
        }
        if (error.response.data.errors.password !== null) {
          callToast(error.response.data.errors.password, "error");
        }
        if (error.response.data.errors.lokasi !== null) {
          callToast(error.response.data.errors.lokasi, "error");
        }
        if (error.response.data.errors.name !== null) {
          callToast(error.response.data.errors.name, "error");
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
              <InputBox
                input={nama}
                handleSet={(e) => setNama(e.target.value)}
              />
            </Box>
            <Box>
              Email
              <InputBox
                input={email}
                handleSet={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              NIM
              <InputBox input={nim} handleSet={(e) => setNim(e.target.value)} />
            </Box>
            <Box>
              Lokasi PKL
              <InputBox
                input={lokasi}
                handleSet={(e) => setLokasi(e.target.value)}
              />
            </Box>
            <Box>
              Nomor Telepon
              <InputBox
                input={notelp}
                handleSet={(e) => setNotelp(e.target.value)}
              />
            </Box>
            <Box>
              Password
              <PasswordInput
                input={password}
                handleSetPassword={(e) => setPassword(e.target.value)}
              />
            </Box>
            <ButtonBoxSignIn
              handle={() => handleRegister()}
              buttonType="Sign Up"
            />
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}
export default RegisterBoxMahasiswa;
