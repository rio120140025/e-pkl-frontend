import { Box, Center, Select, SimpleGrid, Text } from "@chakra-ui/react";

import { ButtonBoxSimpanProfile, ButtonBox } from "../components/button-box";
import DisplayBox from "../components/display-box";
import { InputBox, InputBox2 } from "../../login-page/components/input-box";
import { PasswordInput2 } from "../../login-page/components/password";
import BackButton from "../../../assets/button-back.svg";
import { Link } from "react-router-dom";
import OnlyDisplay from "./onlyDisplay";

import React, { useState, useEffect } from "react";
import { Flex, Image, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link as RouterLink } from "react-router-dom";
import PilihDosen from "../components/pilih-dosen";
import { useQuery } from "react-query";

function ProfileBoxMahasiswa(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [nip, setNip] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [rolesId, setRolesId] = useState("");
  const [dosbim, setDosbim] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const [namaDosen, setNamaDosen] = useState("");
  const [namaDPL, setNamaDPL] = useState("");
  const [dataPKL, setDataPKL] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/profile", {
        headers: { Authorization: "Bearer " + cookies?.jwt_token?.data },
      })
      .then((response) => {
        const dataServer = response.data;
        setEmail(dataServer.email);
        setPassword(dataServer.password);
        setId(dataServer.id);
        setName(dataServer.name);
        setNim(dataServer.nim);
        setNip(dataServer.nip);
        setNoHp(dataServer.no_hp);
        setJabatan(dataServer.jabatan);
        setLokasi(dataServer.lokasi);
        setRolesId(dataServer.roles_id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/pkl/data", {
        headers: { Authorization: "Bearer " + cookies?.jwt_token?.data },
      })
      .then((response) => {
        setDataPKL(response.data.body);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);
  console.log(dataPKL.length);

  useEffect(() => {
    if (dataPKL.length > 0) {
      for (let i = 0; i < dataPKL.length; i++) {
        if (dataPKL[i].mahasiswa.id === id) {
          setNamaDosen(dataPKL[i].dospem.name);
          setNamaDPL(dataPKL[i].dpl.name);
        }
      }
    }
  }, [dataPKL, id]);

  const navigate = useNavigate();

  function GoToUbah() {
    navigate("/profile-ubah");
  }
  return (
    <Flex
      marginTop={15}
      position="absolute"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="87.9%"
      direction="column"
      gap="32px"
      py="35px"
      alignItems="center"
    >
      <Text
        color="#000"
        fontSize="15px"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="normal"
        width="max-content"
      >
        Identitas Diri
      </Text>

      {rolesId == 1 && (
        <Flex direction="row" gap="120px">
          <Flex direction="column" w="max-content" gap="13.15px">
            <OnlyDisplay name="Nama" value={name} />
            <OnlyDisplay name="Email" value={email} />
            <OnlyDisplay name="NIM" value={nim} />
            <OnlyDisplay name="Nomor Telpon" value={no_hp} />
          </Flex>

          <Flex direction="column" w="max-content" gap="13.15px">
            <OnlyDisplay name="Tempat PKL" value={lokasi} />
            <OnlyDisplay name="Dosen Pembimbing" value={namaDosen} />
            <OnlyDisplay name="Dosen Pembimbing Lapangan" value={namaDPL} />
          </Flex>
        </Flex>
      )}

      {rolesId == 2 && (
        <Flex direction="column" w="max-content" gap="13.15px">
          <OnlyDisplay name="Nama" value={name} />
          <OnlyDisplay name="Email" value={email} />
          <OnlyDisplay name="NRK/NIP" value={nip} />
          <OnlyDisplay name="Nomor Telpon" value={no_hp} />
        </Flex>
      )}

      {rolesId == 3 && (
        <Flex direction="row" gap="120px">
          <Flex direction="column" w="max-content" gap="13.15px">
            <OnlyDisplay name="Nama" value={name} />
            <OnlyDisplay name="Email" value={email} />
            <OnlyDisplay name="NRK/NIP" value={nip} />
          </Flex>

          <Flex direction="column" w="max-content" gap="13.15px">
            <OnlyDisplay name="Nomor Telpon" value={no_hp} />
            <OnlyDisplay name="Jabatan" value={jabatan} />
            <OnlyDisplay name="Instansi" value={lokasi} />
          </Flex>
        </Flex>
      )}

      <ButtonBox name="Ubah" handle={GoToUbah} />
    </Flex>
  );
}

function ChangeProfileBoxMahasiswa(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [nip, setNip] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [rolesId, setRolesId] = useState("");
  const [dosbim, setDosbim] = useState("");
  const [dpl, setDpl] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [pkl_id, setPkl_id] = useState("");
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  let existingPKLData = false

  function callToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  const fetchProfileData = async (jwtToken) => {
    const response = await axios.get("http://127.0.0.1:8000/api/user/profile", {
      headers: { Authorization: "Bearer " + jwtToken },
    });
    return response.data;
  };

  const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useQuery('profileData', () =>
    fetchProfileData(cookies.jwt_token?.data || '')
  );


  const fetchPKLDataForMahasiswa = async (jwtToken, id) => {
    const response = await axios.get("http://127.0.0.1:8000/api/user/pkl/data", {
      headers: { Authorization: "Bearer " + jwtToken },
    });
    return response.data.body.find(data => data.mahasiswa_id == id) || null;
  };

  const { data: pklData, isLoading: isPKLLoading, isError: isPKLError } = useQuery('pklData', () =>
    fetchPKLDataForMahasiswa(cookies.jwt_token?.data || '', id),
    { enabled: rolesId == 1 }
  );

  useEffect(() => {
    if (!isProfileLoading && !isProfileError) {
      const { id, name, email, nim, nip, no_hp, roles_id, dosbim, dpl, jabatan, lokasi } = profileData;
      setId(id);
      setName(name);
      setEmail(email)
      setNim(nim);
      setNip(nip);
      setNoHp(no_hp);
      setRolesId(roles_id);
      setJabatan(jabatan);
      setLokasi(lokasi);
    }
  }, [isProfileLoading, isProfileError, profileData]);


  useEffect(() => {
    if (!isPKLLoading && !isPKLError && pklData) {
      const { id, dospem_id, dpl_id } = pklData;
      setPkl_id(id);
      setDosbim(dospem_id);
      setDpl(dpl_id);
    }
  }, [isPKLLoading, isPKLError, pklData]);

  if (isProfileLoading || isPKLLoading) {
    return

  }

  if (pklData) {
    existingPKLData = true
  }

  // console.log("existingPKLData", existingPKLData);
  // console.log("===============================", dosbim);
  const handleUpdate = () => {
    let updateData;
    let dataPKL;

    if (rolesId === 1) {
      updateData = {
        name: name,
        nim: nim,
        password: 'haikal123',
        no_hp: no_hp,
        lokasi: lokasi,
      };

      dataPKL = {
        mahasiswa_id: parseInt(id),
        dospem_id: parseInt(dosbim),
        dpl_id: parseInt(dpl),
      };
      if (!existingPKLData) {
        axios
          .post(`http://127.0.0.1:8000/api/user/pkl`, dataPKL, {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data }
          })
          .then(response => {
            callToast("Berhasil Menambah Data", "success");
            console.log(updateData);
          })
          .catch(error => {
            if (error?.response?.data?.reason) {
              Object.keys(error.response.data.errors).forEach(function (key, index) {
                callToast(error.response.data.errors[key], "error");
              });
            }
          });
      } else {
        axios
          .post(`http://127.0.0.1:8000/api/user/pkl/update/${pkl_id}`, dataPKL, {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data }
          })
          .then(response => {
            callToast("Berhasil Mengubah Data", "success");
            console.log(updateData);
          })
          .catch((error) => {
            if (error?.response?.data?.errors) {
              Object.keys(error.response.data.errors).forEach(function (key, index) {
                callToast(error.response.data.errors[key], "error");
              });
            }
          });
      }
    } else if (rolesId === 2) {
      updateData = {
        name: name,
        nip: nip,
        password: 'haikal123',
        no_hp: no_hp,
      };
    } else if (rolesId === 3) {
      updateData = {
        name: name,
        nip: nip,
        password: 'haikal123',
        no_hp: no_hp,
        lokasi: lokasi,
        jabatan: jabatan,
      };
    }

    axios
      .post(`http://127.0.0.1:8000/api/user/update/${id}`, updateData, {
        headers: { Authorization: "Bearer " + cookies.jwt_token.data },
      })
      .then((response) => {
        callToast("Berhasil Mengubah Data", "success");
        console.log("data sudah terkirim", updateData);
      })
      .catch((error) => {
        if (error?.response?.data?.reason) {
          callToast(error.response.data.reason, "error");
        }
      });
  };


  return (
    <Flex
      marginTop={15}
      position="absolute"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      direction="column"
      gap="32px"
      py="35px"
    >
      <Link as={RouterLink} to="/profile">
        <Box marginLeft={10}>
          <Image src={BackButton}></Image>
        </Box>
      </Link>
      <Center>
        <Text
          color="#000"
          fontSize="15px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          width="max-content"
        >
          Identitas Diri
        </Text>
      </Center>
      <Center>
        {rolesId == 1 && (
          <Flex direction="row" gap="120px">
            <Flex direction="column" w="max-content" gap="13.15px">
              <InputBox2
                name="Nama"
                input={name}
                handleSet={(e) => setName(e.target.value)}
              />
              <OnlyDisplay
                name="Email"
                value={email}
                isEmail='yes'
                handleSet={(e) => setEmail(e.target.value)}
              />
              <InputBox2
                name="NIM"
                input={nim}
                handleSet={(e) => setNim(e.target.value)}
              />
              {/* <PasswordInput2
                name="Password"
                password={password}
                handleSetPassword={(e) => setPassword(e.target.value)}
              /> */}
              <InputBox2
                name="Nomor Telpon"
                input={no_hp}
                handleSet={(e) => setNoHp(e.target.value)}
              />
            </Flex>

            <Flex direction="column" w="max-content" gap="13.15px">
              <InputBox2
                name="Tempat PKL"
                input={lokasi}
                handleSet={(e) => setLokasi(e.target.value)}
              />
              <PilihDosen
                name="Dosen Pembimbing"
                role={2}
                id={dosbim}
                handleSet={(e) => setDosbim(e.target.value)}
              />
              <PilihDosen
                name="Dosen Pembimbing"
                role={3}
                id={dpl}
                handleSet={(e) => setDpl(e.target.value)}
              />
            </Flex>
          </Flex>
        )}

        {rolesId == 2 && (
          <Flex direction="column" w="max-content" gap="13.15px">
            <InputBox2
              name="Nama"
              input={name}
              handleSet={(e) => setName(e.target.value)}
            />
            <OnlyDisplay
              name="Email"
              value={email}
              isEmail='yes'
              handleSet={(e) => setEmail(e.target.value)}
            />
            <InputBox2
              name="NRK/NIP"
              input={nip}
              handleSet={(e) => setNip(e.target.value)}
            />
            {/* <PasswordInput2
              name="Password"
              password={password}
              handleSetPassword={(e) => setPassword(e.target.value)}
            /> */}
            <InputBox2
              name="Nomor Telpon"
              input={no_hp}
              handleSet={(e) => setNoHp(e.target.value)}
            />
          </Flex>
        )}

        {rolesId == 3 && (
          <Flex direction="row" gap="120px">
            <Flex direction="column" w="max-content" gap="13.15px">
              <InputBox2
                name="Nama"
                input={name}
                handleSet={(e) => setName(e.target.value)}
              />
              <OnlyDisplay
                name="Email"
                value={email}
                isEmail='yes'
                handleSet={(e) => setEmail(e.target.value)}
              />
              <InputBox2
                name="NRK/NIP"
                input={nip}
                handleSet={(e) => setNip(e.target.value)}
              />
              {/* <PasswordInput2
                name="Password"
                password={password}
                handleSetPassword={(e) => setPassword(e.target.value)}
              /> */}
            </Flex>

            <Flex direction="column" w="max-content" gap="13.15px">
              <InputBox2
                name="Nomor Telpon"
                input={no_hp}
                handleSet={(e) => setNoHp(e.target.value)}
              />
              <InputBox2
                name="Jabatan"
                input={jabatan}
                handleSet={(e) => setJabatan(e.target.value)}
              />
              <InputBox2
                name="Instansi"
                input={lokasi}
                handleSet={(e) => setLokasi(e.target.value)}
              />
            </Flex>
          </Flex>
        )}
      </Center>
      <Center>
        <ButtonBox name="Simpan" handle={() => handleUpdate()} />
      </Center>
    </Flex>
  );
}

export { ProfileBoxMahasiswa, ChangeProfileBoxMahasiswa };
