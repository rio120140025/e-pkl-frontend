import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

function getDataDosen() {
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [dataDosen, setDataDosen] = useState({})
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/data/alluser", {
                headers: { Authorization: "Bearer " + cookies.jwt_token.data }
            })
            .then(response => {
                setDataDosen(response.data);
                if (dataServer.roles_id == 2) {
                    setId(user.id);
                    setName(user.name);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }, [cookies.jwt_token.data]);
}

export default getDataDosen