import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

function GetDataUser(emailLogin) {
    const [namaUser, setNamaUser] = useState(localStorage.getItem("namaUser") || null);
    const [roles_idUser, setroles_idUser] = useState(localStorage.getItem("roles_idUser") || null);
    const [cookies, setCookie] = useCookies(['jwt_token']);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                const dataServer = response.data;
                console.log(dataServer)
                const user = getDataUser(dataServer, emailLogin);
                if (user) {
                    setNamaUser(user.name);
                    setroles_idUser(user.roles_id);
                    localStorage.setItem("namaUser", user.name);
                    localStorage.setItem("roles_idUser", user.roles_roles_id);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, [emailLogin]);

    console.log("nama", namaUser);
    console.log("roles_id", roles_idUser);

    return { namaUser, roles_idUser };
}

function getDataUser(dataServer, email) {
    return dataServer?.find(user => user.email === email);
}

export default GetDataUser;