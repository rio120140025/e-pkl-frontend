import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

function GetDataLogin() {
    const [email, setEmail] = useState(localStorage.getItem("email") || null);
    const [password, setPassword] = useState(localStorage.getItem("password") || null);
    const [id, setId] = useState(localStorage.getItem("id") || null);
    const [name, setName] = useState(localStorage.getItem("name") || null);
    const [nim, setNim] = useState(localStorage.getItem("nim") || null);
    const [nip, setNip] = useState(localStorage.getItem("nip") || null);
    const [no_hp, setNoHp] = useState(localStorage.getItem("no_hp") || null);
    const [roles_id, setRolesId] = useState(localStorage.getItem("roles_id") || null);
    const [cookies, setCookie] = useCookies(['jwt_token']);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/profile", {
                headers: { Authorization: "Bearer " + cookies?.jwt_token?.data }
            })
            .then(response => {
                const dataServer = response.data;
                console.log("ini get data user", dataServer)
                if (dataServer) {
                    setEmail(dataServer.email);
                    setPassword(dataServer.password);
                    setId(dataServer.id);
                    setName(dataServer.name);
                    setNim(dataServer.nim);
                    setNip(dataServer.nip);
                    setNoHp(dataServer.no_hp);
                    setRolesId(dataServer.roles_id);

                    localStorage.setItem("email", dataServer.email);
                    localStorage.setItem("password", dataServer.password);
                    localStorage.setItem("id", dataServer.id);
                    localStorage.setItem("name", dataServer.name);
                    localStorage.setItem("nim", dataServer.nim);
                    localStorage.setItem("nip", dataServer.nip);
                    localStorage.setItem("no_hp", dataServer.no_hp);
                    localStorage.setItem("roles_id", dataServer.roles_id);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, [])
}

export default GetDataLogin
