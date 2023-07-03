import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBox(props) {
    return (
        <Button
            onClick={() => props.handle()}
            variant="solid"
            w="121px"
            colorScheme="#93BFCF"
            bg="#93BFCF"
        >
            {props.name}
        </Button>
    );
}

export default ButtonBox