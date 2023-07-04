import React, { useState } from "react";
import { ButtonGroup, Center, Button } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import "./header-dashboard.css";

import { useCookies } from "react-cookie";

function Header(props) {
  const [cookies, setCookie] = useCookies(["name"]);

  if (cookies.jwt_token != null) {
    if (window.location.pathname == "/") {
      window.location.href = "/dashboard";
    }
  } else {
    window.location.href = "/";
  }

  const [valueNavbar, setValueNavbar] = useState(props.page);
  const handleLinkClick = (e, value) => {
    setValueNavbar(value);
  };
  const links = [
    { id: "1", label: "Dashboard", to: "/dashboard" },
    { id: "2", label: "Profile", to: "/profile" },
    { id: "3", label: "Rencana Kegiatan", to: "/rencana-kegiatan" },
    { id: "4", label: "Log Harian", to: "/log-harian" },
    { id: "5", label: "Kehadiran", to: "/kehadiran" },
    { id: "6", label: "Penilaian PKL", to: "/penilaian-pkl" },
    { id: "7", label: "Kuisioner", to: "/kuisioner" },
    { id: "8", label: "Logout", to: "/logout" },
  ];
  console.log(valueNavbar);
  return (
    <Flex
      bgColor="#BDCDD6"
      Width="1280px"
      padding="12px 80px"
      justify-content="space-between"
      align-items="center"
    >
      <Heading fontSize="1.5em">E-PKL</Heading>
      <Spacer />
      <ButtonGroup gap="1em" paddingLeft="80px">
        {links.map((link) => (
          <Link
            onClick={(e) => handleLinkClick(e, link.id)}
            key={link.id}
            className={
              valueNavbar === link.id
                ? "button-click-dashboard"
                : "button-nonclick-dashboard"
            }
            to={link.to}
            fontSize="14px"
          >
            {link.label}
          </Link>
        ))}
      </ButtonGroup>
    </Flex>
  );
}

export default Header;
