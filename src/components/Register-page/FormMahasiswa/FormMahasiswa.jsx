import React from "react";
import Header from "./Header";
import FormMahasiswaBox from "./FormMahasiswaBox";
import { Box } from "@chakra-ui/layout";


function FormMahasiswa() {
    return (
        <Box
            bgImage={"background.jpg"}
            height={"100vh"}
            width={"100vw"}
            w="100%"
            bgRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
        >
            <Header />
            <FormMahasiswaBox />
        </Box>
    );
}

export default FormMahasiswa;
