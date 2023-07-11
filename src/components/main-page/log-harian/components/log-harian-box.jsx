import React from "react";
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";

import ButtonBox from "../../components/button";
import TableLogHarianDosen from "./table-log-harian-dosen";
import TableLogHarianMahasiswa from "./table-log-harian-mahasiswa";



function LogHarianBox() {
    const roles_id = localStorage.getItem('roles_id');
    const id = localStorage.getItem('id');
    console.log(id)
    return (
        <Box
            borderRadius="5px"
            background="#FFF"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            width="100%"
            height="max-content"
            fontSize="15px"
        >
            <Flex direction="column" mx="30px" my="10px" gap="19">
                <Box>
                    <Box paddingBottom="2.5%">
                        {roles_id == "1" && <TableLogHarianMahasiswa />}
                        {(roles_id == "2" || roles_id == "3") && <TableLogHarianDosen />}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}


export default LogHarianBox;
