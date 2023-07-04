// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useCookies } from 'react-cookie';

// function AmbilData() {
//     const [cookies, setCookie] = useCookies(['name']);
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         axios
//             .get("http://127.0.0.1:8000/api/user/data/alluser", {
//                 headers: { Authorization: "Bearer " + cookies.jwt_token }
//             })
//             .then(response => {
//                 setData(response.data)
//                 console.log(response.data)
//             })
//             .catch(error => {
//                 console.log(error.response.data)
//             });
//     }, [cookies.jwt_token]);

//     return { data, token: cookies.jwt_token };
// }

// const { data, token } = AmbilData();
// console.log(data);

// const role = "1";
// export { role, data, token };
