import React from "react";
import { useEffect, useRef, useState } from "react";
import loginImage from "../images/loginImage.png";
import login01 from "../images/loginpage01.png";
import login02 from "../images/loginpage02.png";
import rigthArrow from '../images/Vector 1.png';
import kaka from '../images/kakao.png';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth";

const {Kakao} = window;

function Login () {

  const box = useRef();
  const [num, setNum] = useState(0)
  const number_ref = useRef(0);
  const [days, setDays] = useState();
  const [code, setCode] = useState();
  
  const slideData = [
    {
      img : login01,
      title : "365개의 질문, 그리고 나와 나를 연결할 기록들.",
      pp : "매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은 분명 당신과 당신을 이어주는 고리가 될거에요."
    },
    {
      img : login02,
      title : "소중한 오늘의 질문을 놓치지 마세요!",
      pp : "날짜마다 질문이 달라져요. 답변은 그날까지만 작성, 수정이 가능해요."
    }
  ]

  const [current, setCurrent] = useState(0);
  const length = slideData.length; 

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current -1);
  }

  if (!Array.isArray(slideData) || slideData.length <=0) {
    return null;
  }

  // function repeat() {
  //   if(num === 0 ) {
  //     setInterval(move, 2000);
  //   }
  // }

  // function move() {
  //   number_ref.current -= 100;
  //   setNum(number_ref.current);
  //   console.log(num)
  //   console.log(box.current.style.transform)
  //   box.current.style.transform = `translateX(${num}%)`;
  // }

  // useEffect(() => {
  //   const move = setInterval(() => {
  //     number_ref.current -= 100;
  //     setNum(number_ref.current);
  //     console.log(num)
  //     console.log(box.current.style.transform)
  //     box.current.style.transform = `translateX(${num}%)`;
  //   }, 2000);
  // }, [])

  function kakaoLogin() {
    axios(
      {
      url: "/login/getKakaoAuthUrl",
      method: "get",
      baseURL: "http://61.72.99.219:9130"
      }
      ).then(function (response) {
        console.log(response.data);
        setCode(response.data);
        window.location.href = `${response.data}`;
      }).then(function () {
        console.log("aa");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function move(response) {
    let codea = new URL(window.location.href).searchParams.get("code");
    console.log(codea);
    axios(
    {
      url: `${response}`,
      method: 'get',
      baseURL: 'http://61.72.99.219:9130',
      //withCredentials: true,
    }
    ).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <div className="Login">
      <section>
        {/* <img src={loginImage}></img>
        <p>365개의 질문, 그리고 나와 나를 연결할 기록들.</p>
        <div className="overflow">
          <div className="box" ref={box}>
            <p>매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은 분명 당신과 당신을 이어주는 고리가 될거에요.</p>
            <p>날짜마다 질문이 달라져요. 답변은 그날까지만 작성, 수정이 가능해요.</p>
            <p>매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은 분명 당신과 당신을 이어주는 고리가 될거에요.</p>
            <p>날짜마다 질문이 달라져요. 답변은 그날까지만 작성, 수정이 가능해요.</p>
          </div>
        </div> */}
        {slideData.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key = {index}>
              {index === current && (
                <img src={slide.img} className="image" />
              )}
              {index === current && (
                <p>{slide.title}</p>
              )}
              {index === current && (
                <p>{slide.pp}</p>
              )}
            </div>
          )
        })}
        <div className="changeBtns">
          <img onClick={prevSlide} src={rigthArrow}></img>
          <img onClick={nextSlide} src={rigthArrow}></img>
        </div>
      </section>
      <section>
        <p>로그인</p>
        <p>카카오톡 계정으로 1초 안에 로그인하세요.</p>
        <div className="button">
          <img src={kaka}></img>
          <a href={KAKAO_AUTH_URL}><p>카카오톡으로 계속</p></a>
        </div>
        <div className="pp">
          <p>신규사용자이신가요?</p>
          <p>카카오 회원가입하기</p>
        </div>
      </section>
    </div>
  )
}

export default Login;