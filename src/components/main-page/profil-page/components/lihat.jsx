import React, { useState, useEffect } from "react";
import InputBox from "./input-box";
import PasswordInput from "./password";
import ButtonBox from "../../components/button";
import { Flex, Text, Image, Box, Center } from '@chakra-ui/react';
import OnlyDisplay from "./onlyDisplay";
import { useNavigate } from "react-router-dom";
import GetDataLogin from "../../get-data-login";
import axios from "axios";
import { useCookies } from 'react-cookie';

function Lihat(props) {
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
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [namaDosen, setNamaDosen] = useState("");
    const [namaDPL, setNamaDPL] = useState("");
    const [dataPKL, setDataPKL] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/profile", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
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
                console.log(error.response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/pkl/data", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                setDataPKL(response.data.body);
            })
            .catch(error => {
                console.log(error.data)
            });
    }, []);
    console.log(dataPKL.length)

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
        navigate('/profile-ubah');
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
            <Text
                color='#000'
                fontSize='15px'
                fontStyle='normal'
                fontWeight='700'
                lineHeight='normal'
                width="max-content"
            >
                Identitas Diri
            </Text>

            {props.roles_id == 1 && (
                <Flex direction="row" gap="120px">
                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="name" value={name} />
                        <OnlyDisplay name="Email" value={email} />
                        <OnlyDisplay name="NIM" value={nim} />
                        <PasswordInput lihat="yes" name='Password' password={password} />
                    </Flex>

                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="Nomor Telpon" value={no_hp} />
                        <OnlyDisplay name="Tempat PKL" value={lokasi} />
                        <OnlyDisplay name="Dosen Pembimbing" value={namaDosen} />
                        <OnlyDisplay name="Dosen Pembimbing Lapangan" value={namaDPL} />

                    </Flex>
                </Flex>
            )}

            {props.roles_id == 2 && (
                <Flex direction="column" w='max-content' gap="13.15px">
                    <OnlyDisplay name="name" value={name} />
                    <OnlyDisplay name="Email" value={email} />
                    <OnlyDisplay name="NRK/NIP" value={nip} />
                    <PasswordInput lihat="yes" name='Password' password={password} />
                    <OnlyDisplay name="Nomor Telpon" value={no_hp} />
                </Flex>
            )}

            {props.roles_id == 3 && (
                <Flex direction="row" gap="120px">
                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="name" value={name} />
                        <OnlyDisplay name="Email" value={email} />
                        <OnlyDisplay name="NRK/NIP" value={nip} />
                        <PasswordInput lihat="yes" name='Password' password={password} />
                    </Flex>

                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="Nomor Telpon" value={no_hp} />
                        <OnlyDisplay name="Jabatan" value={jabatan} />
                        <OnlyDisplay name="Instansi" value={lokasi} />
                    </Flex>
                </Flex>
            )}

            <ButtonBox name='Ubah' handle={GoToUbah} />
        </Flex>
    );
}

export default Lihat;
