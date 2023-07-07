import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Select } from '@chakra-ui/react';
import { useCookies } from "react-cookie";
import axios from "axios";

function PilihDosen(props) {
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [dataDosen, setDataDosen] = useState({})
    const dataDosenFilter = []
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                setDataDosen(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, []);
    for (let i = 0; i < Object.keys(dataDosen).length; i++) {
        if (dataDosen[i].roles_id == props.role) {
            dataDosenFilter.push(dataDosen[i])
        }
    }
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
                placeholder='Pilih'
                value={props.input}
                onChange={(e) => props.handleSet(e)}
            >
                {dataDosenFilter.map((dataDosenFilter) => (
                    <option key={dataDosenFilter.id} value={dataDosenFilter.id}>
                        {dataDosenFilter.name}
                    </option>
                ))}
            </Select>
        </Box>
    )
}

export default PilihDosen