import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

function Logout() {
  const history = useHistory();
  useEffect(() => {
    const token = sessionStorage.getItem("token") || null;
    axios
      .get(`/logout?token=${token}`)
      .then(function (res) {
        if (res.status === 200 && res.data.msg) {
          sessionStorage.clear();
          history.push("/");
        }
      })
      .catch(function (err) {
        console.error(err);
        alert("로그아웃에 실패하였습니다.");
      });
  }, [history]);

  return <div>logout</div>;
}

export default Logout;
