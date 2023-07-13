import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import {
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    HStack,
    Box
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { TableView } from "./table-view";
import { TableEditDPL } from "./table-edit";


function DetailMahasiswaDosen(props) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate("/log-harian-detail");
        localStorage.setItem("pkl_id", e.target.value);
    };

    return (
        <button
            style={{
                display: "inline-block",
                borderRadius: "5px",
                backgroundColor: "#93bfcf",
                width: "81px",
                height: "26px",
                color: "#f5f5f5",
                cursor: "pointer",
                textAlign: "center",
                paddingTop: "3px",
                fontWeight: "bolder",
                textDecoration: "none",
                border: "none",
                lineHeight: "20px",
            }}
            value={props.pkl_id}
            onClick={handleClick}
        >
            Detail
        </button>
    );
}
function DetailLogHarianMahasiswaDosenDetail(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log("ini nilai roles", props.roles)
    console.log("ini nilai log harian", props.logHarian_data)
    return (
        <>
            <Button
                variant="solid"
                color={"white"}
                fontWeight={"bold"}
                backgroundColor="#93BFCF"
                width={81}
                height={26}
                marginTop={3}
                textAlign={"center"}
                _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
                onClick={onOpen}
            >
                Detail
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <ModalCloseButton color={"#BDCDD6"} />
                        {props.roles == '3' ? <TableEditDPL logHarian_data={props.logHarian_data} isDPL="yes" /> : <TableView logHarian_data={props.logHarian_data} />}
                    </ModalBody>
                    <ModalFooter>
                        <button className="button-box-2" onClick={onClose}>
                            Tutup
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}



// function ButtonBoxDetailLogHarianDPLDetail() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     return (
//         <>
//             <Button
//                 variant="solid"
//                 color={"white"}
//                 fontWeight={"bold"}
//                 backgroundColor="#93BFCF"
//                 width={81}
//                 height={26}
//                 marginTop={3}
//                 textAlign={"center"}
//                 _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
//                 onClick={onOpen}
//             >
//                 Detail
//             </Button>
//             <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalBody>
//                         <ModalCloseButton color={"#BDCDD6"} />
//                         <TableView />
//                     </ModalBody>
//                     <ModalFooter>
//                         <HStack spacing={10}>
//                             <button className="button-box-2" onClick={onClose}>
//                                 Tutup
//                             </button>
//                             <button className="button-box-3" width="200px" onClick={onClose}>
//                                 Tambah Komentar
//                             </button>
//                         </HStack>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }

// function ButtonBoxDetailLogHarianDPLDetail() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     return (
//         <>
//             <Button
//                 variant="solid"
//                 color={"white"}
//                 fontWeight={"bold"}
//                 backgroundColor="#93BFCF"
//                 width={81}
//                 height={26}
//                 marginTop={3}
//                 textAlign={"center"}
//                 _hover={{ background: "#e1e7ea", color: "#93BFCF" }}
//                 onClick={onOpen}
//             >
//                 Detail
//             </Button>
//             <Modal isOpen={isOpen} onClose={onClose} size={"1"}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalBody>
//                         <ModalCloseButton color={"#BDCDD6"} />
//                         <TableView />
//                     </ModalBody>
//                     <ModalFooter>
//                         <HStack spacing={10}>
//                             <button className="button-box-2" onClick={onClose}>
//                                 Tutup
//                             </button>
//                             <button className="button-box-3" width="200px" onClick={onClose}>
//                                 Tambah Komentar
//                             </button>
//                         </HStack>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }

export { DetailMahasiswaDosen, DetailLogHarianMahasiswaDosenDetail }