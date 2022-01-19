import React from "react";
import { useHistory } from "react-router-dom";
import xxxxx from "../styles/images/xxxxx.png";
import "../styles/loginAlert.css";

export function LoginAlert({ setLoginAlert }) {
  const history = useHistory();

  return (
    <div className="deleteModal">
      <img onClick={() => setLoginAlert(false)} src={xxxxx}></img>
      <p>로그인이 필요한 기능입니다.</p>
      <p>로그인 후 이용해주세요.</p>
      <section>
        <p onClick={() => setLoginAlert(false)}>취소하기</p>
        <p onClick={() => history.push("/login")}>로그인하기</p>
      </section>
    </div>
  );
}
