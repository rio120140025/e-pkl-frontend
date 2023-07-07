import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { emailLogin } from "../login-page/components/login-box";

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
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                const dataServer = response.data;
                const user = getDataUser(dataServer, emailLogin);
                if (user) {
                    setEmail(user.email);
                    setPassword(user.password);
                    setId(user.id);
                    setName(user.name);
                    setNim(user.nim);
                    setNip(user.nip);
                    setNoHp(user.no_hp);
                    setRolesId(user.roles_id);

                    localStorage.setItem("email", user.email);
                    localStorage.setItem("password", user.password);
                    localStorage.setItem("id", user.id);
                    localStorage.setItem("name", user.name);
                    localStorage.setItem("nim", user.nim);
                    localStorage.setItem("nip", user.nip);
                    localStorage.setItem("no_hp", user.no_hp);
                    localStorage.setItem("roles_id", user.roles_id);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, [cookies.jwt_token.data]);

    return { email, password, id, name, nim, nip, no_hp, roles_id, cookies };
}

function getDataUser(dataServer, email) {
    return dataServer?.find(user => user.email === email);
}

export default GetDataLogin;
