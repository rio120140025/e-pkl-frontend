import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';
import Header from "./header-dashboard";

function Dashboard() {
  const [cookies, setCookie] = useCookies(['name']);

  if (cookies.jwt_token != null) {
    console.log('Ini tokennya: ', cookies.jwt_token.data)
    if (window.location.pathname == '/') {
      window.location.href = "/dashboard";
    }
  } else {
    console.log('user ini tidak login')
    window.location.href = "/";
  }
  return (
    <div>
      <Header />
    </div>
  );
}

export default Dashboard;
