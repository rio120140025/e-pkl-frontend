import React from "react";
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import TableComponenet from "./table";



function TableRencanaKegiatan() {
    return (
        <Box

            borderRadius="5px"
            background="#FFF"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            width="100%"
            height="max-content"
            fontSize="15px"
        >
            <Flex direction="column " mx="30px" my="10px" gap="19" >

                <Box paddingBottom="2.5%">
                    <TableComponenet />
                </Box>
            </Flex>
        </Box>
    );
}

export default TableRencanaKegiatan;
