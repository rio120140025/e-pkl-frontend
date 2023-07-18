import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Select } from '@chakra-ui/react';
import { useCookies } from "react-cookie";
import axios from "axios";

function PilihDosen(props) {
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [dataDosen, setDataDosen] = useState([]);
    const [dataDosenFilter, setDataDosenFilter] = useState([]);
    useEffect(() => {
        // console.log("ini kode dpl", props.IdDPL)
        // console.log("ini kode dosbim", props.IdDosbim)
        axios
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                // console.log("ini data buat baca dosen", response.data)
                setDataDosen(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, []);

    useEffect(() => {
        const filteredData = dataDosen.filter(dosen => dosen.roles_id === props.role);
        setDataDosenFilter(filteredData);
    }, [dataDosen, props.role]);
    return (
        <Box>
            <Text>{props.name}</Text>
            <Select
                width='373.913px'
                height='36px'
                flexShrink='0'
                borderRadius='5px'
                border='1px solid #BDCDD6'
                background='#FFF'
                placeholder={props.id == '' ? 'Pilih' : undefined}
                value={props.id}
                onChange={(e) => props.handleSet(e)}
            >
                {dataDosenFilter.map((dataDosenFilter) => (
                    <option key={dataDosenFilter.id} value={dataDosenFilter.id}>
                        {dataDosenFilter.name}
                    </option>
                ))}
            </Select>
        </Box>
    );
}

export default PilihDosen;
