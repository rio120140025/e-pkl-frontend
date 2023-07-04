import React, { useState } from "react";
import InputBox from "./input-box";
import PasswordInput from "./password";
import ButtonBox from "../../components/button";
import { Flex, Text, Image, Box, Center, Link } from '@chakra-ui/react';
import OnlyDisplay from "./onlyDisplay";
import backButton from "../../../../assets/Vector.svg"
import { Link as RouterLink } from "react-router-dom";

function Ubah(props) {
    const [password, setPassword] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [notelp, setNotelp] = useState("");
    const [dosbim, setDosbim] = useState("");
    const [dpl, setdpl] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [instansi, setInstansi] = useState("");



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
            <Link position="fixed" pr="80%" as={RouterLink} to='/profile'><Image src={backButton} ></Image></Link>
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
            {props.userCode === 1 && (
                <Flex direction="row" gap="120px">
                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="Nama" />
                        <OnlyDisplay name="Email" />
                        <OnlyDisplay name="NIM" />
                        <PasswordInput name='Password' password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
                    </Flex>

                    <Flex direction="column" w='max-content' gap="13.15px">
                        <InputBox name="Nomor Telpon" value={notelp} handleSet={(e) => setNotelp(e.target.value)} />
                        <InputBox name="Tempat PKL" value={lokasi} handleSet={(e) => setLokasi(e.target.value)} />
                        <OnlyDisplay name="Dosen Pembimbing" option="yes" dosbim={dosbim} handleSet={(e) => setDosbim(e.target.value)} />
                        <InputBox name="Dosen Pembimbing Lapangan" value={dpl} handleSet={(e) => setdpl(e.target.value)} />
                    </Flex>

                </Flex>

            )
            }

            {
                props.userCode === 2 && (
                    <Flex direction="column" w='max-content' gap="13.15px">
                        <OnlyDisplay name="Nama" />
                        <OnlyDisplay name="Email" />
                        <OnlyDisplay name="NRK/NIP" />
                        <PasswordInput name='Password' password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
                        <InputBox name="Nomor Telpon" value={instansi} handleSet={(e) => setInstansi(e.target.value)} />
                    </Flex>
                )
            }

            {
                props.userCode === 3 && (
                    <Flex direction="row" gap="120px">
                        <Flex direction="column" w='max-content' gap="13.15px">
                            <OnlyDisplay name="Nama" />
                            <OnlyDisplay name="Email" />
                            <OnlyDisplay name="NRK/NIP" />
                            <PasswordInput name='Password' password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
                        </Flex>

                        <Flex direction="column" w='max-content' gap="13.15px">
                            <InputBox name="Nomor Telpon" value={notelp} handleSet={(e) => setNotelp(e.target.value)} />
                            <InputBox name="Jabatan" value={jabatan} handleSet={(e) => setJabatan(e.target.value)} />
                            <InputBox name="Instansi" value={dpl} handleSet={(e) => setdpl(e.target.value)} />
                        </Flex>

                    </Flex>
                )
            }


            <ButtonBox name='Simpan' />
        </Flex >
    );
}

export default Ubah;
