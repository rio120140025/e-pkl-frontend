import React, { useState, useEffect } from "react";
import InputBox from "./input-box";
import PasswordInput from "./password";
import ButtonBox from "../../components/button";
import { Flex, Text, Image, Box, Center, Link, useToast } from '@chakra-ui/react';
import OnlyDisplay from "./onlyDisplay";
import backButton from "../../../../assets/Vector.svg"
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import PilihDosen from "./pilih-dosen";

function Ubah(props) {
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
    const [existingPKLData, setExistingPKLData] = useState('');

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/profile", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                // console.log("ini data yang diambil", response.data)
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
            .catch(error => {
                console.log(error.response);
            });
    }, []);
    useEffect(() => {
        if (rolesId === 1) {
            axios
                .get("http://127.0.0.1:8000/api/user/pkl/data", {
                    headers: { Authorization: "Bearer " + cookies.jwt_token.data }
                })
                .then(response => {
                    // console.log("test", response.data.body)
                    // const foundPKLData = dataServer.find(data => data.mahasiswa_id === id);
                    response.data.body.map((data) => {
                        // console.log("this", data)
                        if (data.mahasiswa_id == id) {
                            // console.log("this", data.mahasiswa)
                            setPkl_id(data.id)
                            setExistingPKLData(true)
                            console.log("ini data pkl dan dosen", data)
                            setDosbim(data.dospem_id);
                            setDpl(data.dpl_id);
                            // console.log("this", existingPKLData)
                            return
                        }
                        else {
                            setExistingPKLData(false)
                        }
                    })
                })
                .catch(error => {
                    Object.keys(error.response.data.errors).forEach(function (key, index) {
                        callToast(error.response.data.errors[key], "error");
                    });
                });
        }
    });
    // console.log("dosbim", dosbim)
    // console.log("dpl", dpl)

    const toast = useToast();

    function callToast(title, status) {
        toast({
            title: title,
            status: status,
            duration: 3000,
            isClosable: true
        });
    }
    console.log("existingPKLData", existingPKLData)
    const handleUpdate = () => {

        let updateData;
        let dataPKL;

        if (rolesId === 1) {
            updateData = {
                name: name,
                nim: nim,
                password: password,
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
                        Object.keys(error.response.data.errors).forEach(function (key, index) {
                            callToast(error.response.data.errors[key], "error");
                        });
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
                    .catch(error => {
                        Object.keys(error.response.data.errors).forEach(function (key, index) {
                            callToast(error.response.data.errors[key], "error");
                        });
                    });
            }
        } else if (rolesId === 2) {
            updateData = {
                name: name,
                nip: nip,
                password: password,
                no_hp: no_hp,
            };
        } else if (rolesId === 3) {
            updateData = {
                name: name,
                nip: nip,
                password: password,
                no_hp: no_hp,
                lokasi: lokasi,
                jabatan: jabatan,
            };
        }

        axios
            .post(`http://127.0.0.1:8000/api/user/update/${id}`, updateData, {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                callToast("Berhasil Mengubah Data", "success");
                console.log("data sudah terkirim", updateData);
            })
            .catch(error => {
                console.log(error.response);
                callToast(error.response.data.reason, "error");
            });
    }

    return (
        <Flex
            borderRadius="5px"
            background="#FFF"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            height="max-content"
            fontSize="15px"
            direction="column"
            alignItems="center"
            gap="32px"
            py="35px"
        >
            <Link position="fixed" pr="80%" as={RouterLink} to="/profile">
                <Image src={backButton}></Image>
            </Link>
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
            {props.roles_id == 1 && (
                <Flex direction="row" gap="120px">
                    <Flex direction="column" w="max-content" gap="13.15px">
                        <InputBox name="Nama" input={name} handleSet={(e) => setName(e.target.value)} />
                        <OnlyDisplay name="Email" value={email} handleSet={(e) => setEmail(e.target.value)} />
                        <InputBox name="NIM" input={nim} handleSet={(e) => setNim(e.target.value)} />
                        <PasswordInput
                            name="Password"
                            password={password}
                            handleSetPassword={(e) => setPassword(e.target.value)}
                        />
                    </Flex>

                    <Flex direction="column" w="max-content" gap="13.15px">
                        <InputBox
                            name="Nomor Telpon"
                            input={no_hp}
                            handleSet={(e) => setNoHp(e.target.value)}
                        />
                        <InputBox
                            name="Tempat PKL"
                            input={lokasi}
                            handleSet={(e) => setLokasi(e.target.value)}
                        />
                        <PilihDosen
                            name="Dosen Pembimbing"
                            role={2}
                            IdDosbim={dosbim}
                            handleSet={(e) => setDosbim(e.target.value)}
                        />
                        <PilihDosen
                            name="Dosen Pembimbing"
                            role={3}
                            IdDPL={dpl}
                            handleSet={(e) => setDpl(e.target.value)}
                        />
                    </Flex>
                </Flex>
            )}

            {props.roles_id == 2 && (
                <Flex direction="column" w="max-content" gap="13.15px">
                    <InputBox name="Nama" input={name} handleSet={(e) => setName(e.target.value)} />
                    <OnlyDisplay name="Email" value={email} handleSet={(e) => setEmail(e.target.value)} />
                    <InputBox name="NRK/NIP" input={nip} handleSet={(e) => setNip(e.target.value)} />
                    <PasswordInput
                        name="Password"
                        password={password}
                        handleSetPassword={(e) => setPassword(e.target.value)}
                    />
                    <InputBox
                        name="Nomor Telpon" input={no_hp} handleSet={(e) => setNoHp(e.target.value)}
                    />
                </Flex>
            )}

            {props.roles_id == 3 && (
                <Flex direction="row" gap="120px">
                    <Flex direction="column" w="max-content" gap="13.15px">
                        <InputBox name="Nama" input={name} handleSet={(e) => setName(e.target.value)} />
                        <OnlyDisplay name="Email" value={email} handleSet={(e) => setEmail(e.target.value)} />
                        <InputBox name="NRK/NIP" input={nip} handleSet={(e) => setNip(e.target.value)} />
                        <PasswordInput
                            name="Password"
                            password={password}
                            handleSetPassword={(e) => setPassword(e.target.value)}
                        />
                    </Flex>

                    <Flex direction="column" w="max-content" gap="13.15px">
                        <InputBox
                            name="Nomor Telpon"
                            input={no_hp}
                            handleSet={(e) => setNoHp(e.target.value)}
                        />
                        <InputBox
                            name="Jabatan"
                            input={jabatan}
                            handleSet={(e) => setJabatan(e.target.value)}
                        />
                        <InputBox
                            name="Instansi"
                            input={lokasi}
                            handleSet={(e) => setLokasi(e.target.value)}
                        />
                    </Flex>
                </Flex>
            )}

            <ButtonBox name="Simpan" handle={() => handleUpdate()} />
        </Flex>
    );
}

export default Ubah;