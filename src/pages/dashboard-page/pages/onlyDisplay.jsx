import React, { useState } from "react";
import { Box, Flex, Text, Select } from '@chakra-ui/react';

function OnlyDisplay(props) {
    const [click, setClick] = useState(false)
    const dosen = [
    ];
    const handleOnClick = () => {
        setClick(true);
    };
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
            ) : props.isEmail !== 'yes' ? (
                <Box
                    width='373.913px'
                    height='36px'
                    flexShrink='0'
                    borderRadius='5px'
                    border='1px solid #BDCDD6'
                    background='#FFF'
                >
                    <Text
                        py='7.5px'
                        px='13px'
                        color='#000'
                        fontSize='14px'
                        fontStyle='normal'
                        fontWeight='400'
                        lineHeight='normal'
                    >
                        {props.value}
                    </Text>
                </Box>
            ) : (
                <>
                    <Box
                        width='373.913px'
                        height='36px'
                        flexShrink='0'
                        borderRadius='5px'
                        border='1px solid #BDCDD6'
                        background='#FFF'
                        onClick={handleOnClick}
                    >
                        <Text
                            py='7.5px'
                            px='13px'
                            color='#000'
                            fontSize='14px'
                            fontStyle='normal'
                            fontWeight='400'
                            lineHeight='normal'
                        >
                            {props.value}
                        </Text>
                    </Box>
                    {click === true ? (
                        <Text py='7.5px'
                            color='red'
                            fontSize='14px'
                            fontStyle='normal'
                            fontWeight='400'
                            lineHeight='normal'>*kolom ini tidak dapat diubah, silahkan hubungi admin</Text>
                    ) : null}
                </>
            )}
        </Box>
    );
}

export default OnlyDisplay;
