import { dataServer, token } from "../../App";
import { emailLogin } from "../login-page/components/login-box";

let getDataUser = {};

function dataUser() {
    Object.keys(dataServer).forEach(function (key) {
        const userData = dataServer[key];
        if (typeof userData === "object" && userData.email === emailLogin) {
            getDataUser = userData;
        }
    });
    console.log(getDataUser.email);
}

export default dataUser;
