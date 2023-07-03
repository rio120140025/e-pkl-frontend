import React from "react"
import {
    Image,
    Flex,
    Box,
    Text,
    Center

}
    from '@chakra-ui/react'


function Title(props) {
    return (
        <Box>
            <Flex direction="Row" gap={15} alignItems='center' >
                <Center
                    bg="#BDCDD6" w={50} h={50}
                    borderRadius="5px"
                    boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                ><Image src={props.imgsrc} />
                </Center>
                <Box direction="column">
                    <Text
                        color="#000"
                        fontSize="18px"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                    >{props.title}</Text>
                    <Text
                        color="#000"
                        fontSize="15px"
                        fontStyle="normal"
                        lineHeight="normal"
                    >{props.desc}</Text>
                </Box>
            </Flex >
        </Box >
    )
}

export default Title