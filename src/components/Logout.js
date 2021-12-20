import React from "react";
import "../styles/Login.css";
import axios from "axios";

const token = sessionStorage.getItem("token");

function Logout() {
  axios
    .post("https://kapi.kakao.com/v1/user/logout", {
      Authorization: `Bearer+${token}`,
    })
    .then((res) => {
      console.log(res);
    });

  return <div>logout</div>;
}

export default Logout;
