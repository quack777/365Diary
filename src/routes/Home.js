import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import VectorLeft from '../images/Vector left.png';
import VectorRight from '../images/Vector right.png';
import Vector from '../images/Vector 1.png';
import arrow from '../images/arrow01_normal.png';
import main from '../images/mainpage.png';
import './Home.css';
import { Link } from 'react-router-dom';


function Home () {
  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();

  const [answer8, setAnswer8] = useState(["우짤", "나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 이게 200자일 때 모습입니다~", "대답3", "대답4", "대답5", "대답6", "대답7", "대답8"]);
  const [ranname, setRanname] = useState(["뽀로로", "라치카", "시미즈", "리안", "리헤이", "허니제이", "스우파", 8]);
  const [question, setQuestion] = useState("나의 삶의 목적은 무엇인가요?");
  const [num, setNum] = useState(0);

  const answersBox = useRef() 
  function leftMove() {
    if(num >= -300){
      console.log(answersBox.current.style.transition);
      setNum(num-30);
      answersBox.current.style.transform = `translateX(${num}%)`;
    }
  }
  //데이터 세팅
  const [showdata, setShowdata] = useState();
  //데이터 세팅
  function rightMove() {
    if(num <= 30){  
      setNum(num+30);
      answersBox.current.style.transform = `translateX(${num}%)`;
    }
  }

  useEffect(() => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay) + 1;
    axios(
      {
        url: `/question/${day}`,
        method: 'get',
        baseURL: 'http://61.72.99.219:9130',
        //withCredentials: true,
      }
      ).then(function (response) {
        console.log(response.data);
        setQuestion(response.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    axios(
      {
        url: '/random',
        method: 'get',
        baseURL: 'http://61.72.99.219:9130',
        //withCredentials: true,
      }
    ).then(function (response) {
      console.log(response);
      setRanname(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  useEffect(() => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay) + 1;
    axios(
      {
        url: `/random/${day}`, // /random/{question_num}
        method: 'get',
        baseURL: 'http://61.72.99.219:9130',
        //withCredentials: true,
      }
    ).then(function (response) {
      console.log(response.data);
      setAnswer8(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay) + 1;

  return(
    <div className="Home">
      <div className="questions">
        <p>{month}월 {date}일</p>
        <div>
          <img src={VectorLeft} alt="vectorLeft"></img>
          <p>{question}</p>
          <img src={VectorRight} alt="vectorRight"></img>
        </div>
      </div>
      <div className="overflow">
        <div className="Aanswers" ref={answersBox}>
          {answer8.map((answer, index) => {
            return(
              <div className="Aanswer">
                <p>{ranname[index]}</p>
                <p>{answer}</p>
              </div>
            )
          })}
        </div>
        <div className="btnBox">
          <img src={arrow} onClick={leftMove}></img>
          <img src={arrow} onClick={rightMove}></img>
        </div>
      </div>
      <Link to="/write">
        <button id="goWriteBtn">
          <p>오늘 나의 생각 남기기</p>
          <img src={Vector} alt="vector"></img>
        </button>
      </Link>
      <div id="bottom">
        <div>
          <p>365개의 질문,</p>
          <p>그리고 나와 나를 연결할 기록들.</p>
          <p>매일 달라지는 질문에 답해보세요. 사소하지만 큰 기록은 분명 당신과 당신을 이어주는 고리가 될거예요. 3년 동안의 기록을 차곡차곡 모으고,  찬찬히 나를 만나봐요.</p>
        </div>
        <img src={main}></img>
      </div>
    </div>
  )
}

export default Home;