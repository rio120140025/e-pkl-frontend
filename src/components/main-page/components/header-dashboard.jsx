import React, { useState } from "react";
import { ButtonGroup } from "@chakra-ui/react";
import { Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import "./header-dashboard.css";
import { useCookies } from "react-cookie";

function Header(props) {
  const [cookies, , removeCookie] = useCookies(["jwt_token"]);

  if (cookies.jwt_token != null) {
    if (window.location.pathname === "/") {
      window.location.href = "/dashboard";
    }
  } else {
    window.location.href = "/";
  }

  const [valueNavbar, setValueNavbar] = useState(props.page);
  console.log(valueNavbar)
  const handleLinkClick = (e, value) => {
    setValueNavbar(value);
  };

  const handleLogout = () => {
    removeCookie("jwt_token");
    localStorage.clear();
    window.location.href = "/";
  };
  const links = [
    { id: "1", label: "Dashboard", to: "/dashboard" },
    { id: "2", label: "Profile", to: "/profile" },
    { id: "3", label: "Rencana Kegiatan", to: "/rencana-kegiatan" },
    { id: "4", label: "Log Harian", to: "/log-harian" },
    { id: "5", label: "Kehadiran", to: "/kehadiran" },
    { id: "6", label: "Penilaian PKL", to: "/penilaian-pkl" },
    { id: "7", label: "Kuisioner", to: "/kuisioner" },
    { id: "8", label: "Logout", onClick: handleLogout },
  ];

  return (
    <Flex
      bgColor="#BDCDD6"
      Width="1280px"
      padding="12px 80px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading fontSize="1.5em">E-PKL</Heading>
      <Spacer />
      <ButtonGroup gap="1em" marginLeft="80px">
        {links.map((link) =>
          link.to ? (
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
          ) : (
            <button
              key={link.id}
              className={
                valueNavbar === link.id
                  ? "button-click-dashboard"
                  : "button-nonclick-dashboard"
              }
              onClick={link.onClick}
              fontSize="14px"
            >
              {link.label}
            </button>
          )
        )}
      </ButtonGroup>
    </Flex>
  );
}

export default Header;