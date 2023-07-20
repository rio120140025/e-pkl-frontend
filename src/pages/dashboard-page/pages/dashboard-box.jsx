import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { ButtonBoxDownload } from "../components/button-box";
import TableDashboard from "../components/table-dashboard";
// import { useCookies } from "react-cookie";
// import axios from "axios";

function DashboardBoxMahasiswa({ id, roles }) {
  // const [id, setId] = useState(localStorage.getItem("id") || null);
  // const [roles_id, setRolesId] = useState(localStorage.getItem("roles_id") || null);
  // const [data1, setData1] = useState(null);
  // const [cookies] = useCookies(["name"])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response1 = await axios.get(
  //         "http://127.0.0.1:8000/api/user/profile",
  //         {
  //           headers: { Authorization: "Bearer " + cookies.jwt_token.data },
  //         }
  //       );
  //       const updatedData1 = response1.data;
  //       setData1(updatedData1);
  //       setRolesId(updatedData1.roles_id);
  //       setId(updatedData1.id);
  //       localStorage.setItem("roles_id", updatedData1.roles_id);
  //       localStorage.setItem("id", updatedData1.id);
  //       console.log(updatedData1);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [cookies.jwt_token.data]);

  return (
    <Box
      position="absolute"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      fontSize="15px"
    >
      <SimpleGrid>
        <Text
          position="absolute"
          fontWeight="bold"
          marginTop={2}
          marginLeft="30.5px"
        >
          Download Buku Panduan PKL
        </Text>
        <ButtonBoxDownload />
        <Text
          position="absolute"
          fontWeight="bold"
          marginTop={100}
          marginLeft="30.5px"
        >
          Mahasiswa Bimbingan PKL
        </Text>
        <TableDashboard user_id={id} user_roles={roles} />
      </SimpleGrid>
    </Box>
  );
}
// function DashboardBoxDosenDPL({id}) {
//   return (
//     <Box
//       position="absolute"
//       marginTop="175px"
//       left="78px"
//       borderRadius="5px"
//       background="#FFF"
//       boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
//       width="1375px"
//       fontSize="15px"
//     >
//       <SimpleGrid>
//         <Text
//           position="absolute"
//           fontWeight="bold"
//           marginTop={2}
//           marginLeft="30.5px"
//         >
//           Download Buku Panduan PKL
//         </Text>
//         <ButtonBoxDownload />
//         <Text
//           position="absolute"
//           fontWeight="bold"
//           marginTop={100}
//           marginLeft="30.5px"
//         >
//           Mahasiswa Bimbingan PKL
//         </Text>
//         <TableDashboard user_id={id}/>
//       </SimpleGrid>
//     </Box>
//   );
// }

export { DashboardBoxMahasiswa };
