import React from "react";
import { useCookies } from 'react-cookie';
import Header from "./header-dashboard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [cookies, setCookie] = useCookies(['name']);
  const navigate = useNavigate();

  if (cookies.jwt_token != null) {
    console.log('Ini tokennya: ', cookies.jwt_token.data)
    // bisa akses dashboard
  } else {
    console.log('user ini tidak login')
    // suruh login
    // navigate("/", {replace: true});
    window.location.href = "/"
  }
  return (
    <div>
      <Header />
    </div>
  );
}

export default Dashboard;
