import React, { useState } from "react";
import { Box, Flex, Text, Select } from '@chakra-ui/react';

function OnlyDisplay(props) {
    const dosen = [
        { value: "1", name: "Meida Cahyo Untoro, S.Kom., M.Kom" },
        { value: "2", name: "Mugi Prasetyo, S.Kom., M.Kom" },
        { value: "3", name: "Hirawati, S.Kom., M.Kom" },
    ];

    return (
        <Box>
            <Text>{props.name}</Text>

            {props.option === 'yes' ? (
                <Select
                    width='373.913px'
                    height='36px'
                    flexShrink='0'
                    borderRadius='5px'
                    border='1px solid #BDCDD6'
                    background='#FFF'
                    placeholder='Dosen Pembimbing'
                    value={props.input}
                    onChange={(e) => props.handleSet(e)}
                >
                    {dosen.map((dosenItem) => (
                        <option key={dosenItem.value} value={dosenItem.value}>
                            {dosenItem.name}
                        </option>
                    ))}
                </Select>
            ) : (
                <Box
                    width='373.913px'
                    height='36px'
                    flexShrink='0'
                    borderRadius='5px'
                    border='1px solid #BDCDD6'
                    background='#FFF'
                >
                    <Text
                        py="7.5px"
                        px="13px"
                        color='#000'
                        fontSize='14px'
                        fontStyle='normal'
                        fontWeight='400'
                        lineHeight='normal'
                    >
                        {props.value}
                    </Text>
                </Box>
            )}
        </Box>
    );
}

export default OnlyDisplay;
