import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import xxxxx from "../styles/images/xxxxx.png";
import "../styles/loginAlert.css";

export function LoginAlert({ setLoginAlert, route }) {
  const history = useHistory();

  return (
    <div className="deleteModal">
      <img onClick={() => setLoginAlert(false)} src={xxxxx}></img>
      <p>로그인이 필요한 기능입니다.</p>
      <p>로그인 후 이용해주세요.</p>
      <section>
        <p onClick={() => setLoginAlert(false)}>취소하기</p>
        <p
          onClick={() => {
            setLoginAlert(false);
            history.push("/login");
          }}
        >
          로그인하기
        </p>
      </section>
    </div>
  );
}
