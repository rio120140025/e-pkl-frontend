import React, { useState } from "react";
import {
    Box,
    Text,
    Image,
    Flex,
    Spacer,
    Button

}
    from '@chakra-ui/react'
import close from "../../../../assets/close vector.svg"
import GetDataLogin from "../../get-data-login";




function HelloUser(props) {
    const [isOpen, setIsOpen] = useState(true);
    const { name } = GetDataLogin();
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            {isOpen && (
                <Box
                    borderRadius="5px"
                    backgroundColor="#e1e7ea"
                    boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
                    width="100%"
                    height="36px"
                    fontSize="14px"
                >
                    <Flex gap="1" marginTop={1.5} marginLeft={5}>
                        <Text display="inline-block">Halo</Text>
                        <Text display="inline-block" fontWeight="bold">
                            {name} !.
                        </Text>
                        <Text display="inline-block">
                            Selamat datang di aplikasi E-PKL.
                        </Text>
                        <Spacer />
                        <Button
                            bottom={2}
                            variant="ghost"
                            color="BDCDD6"
                            onClick={handleClose}
                        >
                            <Image src={close} />
                        </Button>
                    </Flex>
                </Box>
            )}
        </>
    );
}

export default HelloUser