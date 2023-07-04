import React from "react";
import Header from "../components/header-dashboard";
import Title from "../components/title-page";
import HelloUser from "./components/hello-user";
import DashboardBox from "./components/dashboardbox";
import img from "../../../assets/icon-dashboard.svg"
import {
  Box,
  Flex,

}
  from '@chakra-ui/react'
import GetDataUser from "../get-data-user";
import { emailLogin } from "../../login-page/components/login-box";

function Dashboard() {
  const { namaUser } = GetDataUser(emailLogin);
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundColor="#f4f8fa">

      <Header page="1" />
      <Flex direction="column" gap="12px" py="24px" mx="6.3%">
        <Title title="Dasboard" desc="Sistem Informasi PKL Institut Teknologi Sumatera" imgsrc={img} />
        <HelloUser />
        <Box>
          <DashboardBox />
        </Box>
      </Flex>
    </Box>
  );
}


export default Dashboard;

