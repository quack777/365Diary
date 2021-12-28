import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

function OAuth2RedirectHandler() {
  // 인가코드

  const history = useHistory();
  const [loading] = useState(true);

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    if (loading) {
      setTimeout(() => {
        history.push("/365");
      }, 2000);
    }

    axios({
      method: "GET",
      url: `http://61.72.99.219:9130/login/oauth_kakao?code=${code}`,
    })
      .then((res) => {
        const { id, nickname, token } = res.data;

        sessionStorage.setItem("id", id);
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("token", token);
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
      });
  }, [loading, history]);

  return (
    <div
      className="OAuth2RedirectHandler"
      style={{
        height: "800px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PulseLoader height="160" width="32" color="#36D7B7" radius="8" />
    </div>
  );
}

export default OAuth2RedirectHandler;
