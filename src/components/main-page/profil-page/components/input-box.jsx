import React, { useState } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    Text
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";

function InputBox(props) {
    const [input, setInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const handleInputBlur = () => setIsTouched(true);

    const isError = isTouched && props.input === "";

    return (
        <Box width="max-content" >
            <Text>{props.name}</Text>
            <FormControl isInvalid={isError}>
                <Input
                    value={props.input}
                    onChange={(e) => props.handleSet(e)}
                    onBlur={handleInputBlur}
                    width='373.913px'
                    height='36px'
                    borderRadius='5px'
                    border='1px solid #BDCDD6'
                    background='#FFF'
                />
                {!isError ? (
                    null
                ) : (
                    <FormErrorMessage>*this field must be filled</FormErrorMessage>
                )}
            </FormControl>
        </Box>
    );
}


export default InputBox
