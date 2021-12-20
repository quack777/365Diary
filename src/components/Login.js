import React from "react";
import { useEffect, useRef, useState } from "react";
import loginImage from "../styles/images/loginImage.png";
import login02 from "../styles/images/loginpage01.png";
import login01 from "../styles/images/loginpage02.png";
import rigthArrow from "../styles/images/Vector 1.png";
import kaka from "../styles/images/kakao.png";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL;

const { Kakao } = window;

function Login() {
  const box = useRef();
  const [num, setNum] = useState(0);
  const number_ref = useRef(0);
  const [days, setDays] = useState();
  const [code, setCode] = useState();

  const slideData = [
    {
      img: login01,
      title: "365개의 질문, 그리고 나와 나를 연결할 기록들.",
      pp:
        "매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은",
      ppTwo: "분명 당신과 당신을 이어주는 고리가 될거에요."
    },
    {
      img: login02,
      title: "소중한 오늘의 질문을 놓치지 마세요!",
      pp: "날짜마다 질문이 달라져요.",
      ppTwo: "답변은 그날까지만 작성, 수정이 가능해요."
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = slideData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slideData) || slideData.length <= 0) {
    return null;
  }

  function kakaoLogin() {
    axios({
      url: "/login/getKakaoAuthUrl",
      method: "get",
      baseURL: "http://61.72.99.219:9130",
    })
      .then(function (response) {
        console.log(response.data);
        setCode(response.data);
        window.location.href = `${response.data}`;
      })
      .then(function () {
        console.log("aa");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function move(response) {
    let codea = new URL(window.location.href).searchParams.get("code");
    console.log(codea);
    axios({
      url: `${response}`,
      method: "get",
      baseURL: "http://61.72.99.219:9130",
      //withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="Login">
      <section>
        {slideData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={slide.img} className="image" />}
              {index === current && <p>{slide.title}</p>}
              {index === current && <p>{slide.pp}</p>}
              {index === current && <p>{slide.ppTwo}</p>}
            </div>
          );
        })}
        <div className="practice">
            <button onClick={prevSlide}></button>
            <button onClick={nextSlide}></button>
        </div>
      </section>
      <section>
        <p>로그인</p>
        <p>카카오톡 계정으로 1초 안에 로그인하세요.</p>
        <div className="button">
          <img src={kaka}></img>
          <a href={KAKAO_AUTH_URL}>
            <p>카카오톡으로 계속</p>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Login;