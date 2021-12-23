import React, { useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";

const token = sessionStorage.getItem("token");
console.log("token: ", token);

function Logout() {
  console.log("####");
  useEffect(() => {
    const serverData = axios.post("http://61.72.99.219:9130/logout", { token });
    console.log("serverData: ", serverData);
    // axios
    //   .post("http://61.72.99.219:9130/logout")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // axios({
    //   url: `/logout`, // `/trashes/settings/${answer_num}/${member_num}`
    //   method: "post",
    //   baseURL: "http://61.72.99.219:9130",
    //   data: {
    //     // answer_delete: answer_delete, // N or Y
    //     // delete_date: delete_date, //date타입
    //   },
    // });
    // axios
    //   .post(`/logout`, {
    //     baseURL: "http://61.72.99.219:9130/",
    //     // Authorization: `Bearer+${token}`,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  return <div>logout</div>;
}

export default Logout;
