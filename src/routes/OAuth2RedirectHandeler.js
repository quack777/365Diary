import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

function OAuth2RedirectHandler () {
  // 인가코드

  const history = useHistory();
  
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
  
    console.log(code)
    axios(
      {
      method: "GET",
      url: `http://61.72.99.219:9130/login/oauth_kakao?code=${code}`,
      }
      ).then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        
        const ACCESS_TOKEN = res.data.token;
        const num = res.data.member_num;

        localStorage.setItem("token", ACCESS_TOKEN);    //예시로 로컬에 저장함    
        
        localStorage.setItem("member_num", num);

        history.push('/365')
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
      })}, [])

  return(
    <div className="OAuth2RedirectHandler">
      <p>aaaaaaaaaaaaaaaa</p>
    </div>
  )
};

export default OAuth2RedirectHandler;