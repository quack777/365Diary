import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import VectorLeft from "../styles/images/Vector left.png";
import VectorRight from "../styles/images/Vector right.png";
import Vector from "../styles/images/Vector 1.png";
import arrow from "../styles/images/arrow01_normal.png";
import main from "../styles/images/mainpage.png";
import "../styles/Home.css";
import { Link, useLocation } from "react-router-dom";

function Home(props) {
  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();
  const location = useLocation();

  const [answer8, setAnswer8] = useState([]);
  const [ranname, setRanname] = useState([]);
  const [question, setQuestion] = useState();
  const [todayMyA, setTodayMyA] = useState([]);
  const [todayMyTrashA, setTodayMYTrashA] = useState(false);
  // const [num, setNum] = useState(0);
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  const member_num = sessionStorage.getItem("member_num");
  let num = 0;
  const handleClick = () => (location.onClicked = true);

  const answersBox = useRef();

  function rightMove(a) {
    if (num > -210) {
      num = num - 30;
      answersBox.current.style.transform = `translateX(${num}%)`;
      console.log(num);
    }
  }
  //데이터 세팅
  function leftMove() {
    if (num < 0) {
      num = num + 30;
      answersBox.current.style.transform = `translateX(${num}%)`;
      console.log(num);
      console.log(answersBox.current.style.transform);
    }
  }

  function getRandomNicknames() {
    axios({
      url: `${process.env.REACT_APP_SERVER_IP}/random`,
      method: "get",
      //withCredentials: true,
      // baseURL: "",
    })
      .then(function (response) {
        console.log(response);
        setRanname(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const getRandomAnswers = useCallback(() => {
    axios({
      url: `${process.env.REACT_APP_SERVER_IP}/random/${day}`, // /random/{question_num}
      method: "get",
      //withCredentials: true,
      // baseURL: "/",
    })
      .then(function (response) {
        setAnswerData(response.data); // 답변 8게로 맞추기
        // if (response.status === 200) {
        //   // 실제 데이터가 들어올 경우
        //   // setAnswer8(Array.from({ length: 8 }, (v, i) => response.data[i]));

        //   // =======DUMMY=======
        //   setAnswer8(
        //     Array.from(
        //       { length: 8 },
        //       (v, i) => "당신의 답변을 다른 사람들에게 공유해주세요"
        //     )
        //   );
        // }

        // console.log("arr: ", arr);
        // setAnswer8(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [day]);

  const getQuestion = useCallback(() => {
    axios({
      url: `/question/${day}`,
      method: "get",
      //withCredentials: true,
      baseURL: process.env.REACT_APP_SERVER_IP,
    })
      .then(function (response) {
        console.log(response.data);
        setQuestion(response.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [day]);

  const getTodayMyAnswer = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_IP}/answers/${day}/${member_num}`)
      .then(function (response) {
        console.log(response.data);
        if (response.data.length > 0) {
          setTodayMyA(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTodyaMyTrashAnswer = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_IP}/trashes/${member_num}`)
      .then(function (response) {
        console.log(response.data);
        const year = new Date().getFullYear();
        response.data.filter((data) => {
          if (data.question_num === day) {
            if (data.answer_year == year) {
              setTodayMYTrashA(true);
            }
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestion();
    getRandomAnswers();
    getRandomNicknames();
    getTodayMyAnswer();
    getTodyaMyTrashAnswer();
  }, [getQuestion, getRandomAnswers]);

  function setAnswerData(data) {
    const dataArray = data;
    const pushCout = 8 - data.length;
    for (let index = 0; index < pushCout; index++) {
      dataArray.push("당신의 답변을 다른 사람들에게 공유해주세요");
    }
    setAnswer8(dataArray);
  }

  return (
    <div className="Home">
      <div className={props.isMobile ? "questions_mobile" : "questions"}>
        <p>
          {month}월 {date}일
        </p>
        <div>
          <img src={VectorLeft} alt="vectorLeft"></img>
          <p>{question}</p>
          <img
            src={VectorRight}
            alt="vectorRight"
            className="vectorRight"
          ></img>
        </div>
      </div>
      <div className="overflow">
        <div className="Aanswers" ref={answersBox}>
          {answer8.map((answer, index) => {
            return (
              <div className="Aanswer">
                <p>{ranname[index]}</p>
                <p>{answer}</p>
              </div>
            );
          })}
        </div>
        {/* <div className="btnBox">
          <img src={arrow} onClick={leftMove}></img>
          <img src={arrow} onClick={rightMove}></img>
        </div> */}
        <div className="btnBox">
          <button onClick={leftMove}></button>
          <button onClick={rightMove}></button>
        </div>
      </div>
      <Link
        to={(location) => {
          if (!location.isLogged && location.onClicked) {
            alert("로그인이 필요합니다!");
            return { pathname: "/login" };
          } else {
            if (todayMyA.length > 0 && location.onClicked) {
              if (
                window.confirm(
                  "오늘 답변이 이미 존재합니다! 수정하시겠습니까 ?"
                )
              ) {
                return {
                  pathname: `/write/${day}`,
                  state: {
                    question: question,
                    data: {
                      answer: todayMyA[0].answer,
                      public_answer: todayMyA[0].public_answer,
                      answer_date: todayMyA[0].answer_date,
                      answer_year: todayMyA[0].answer_year,
                      member_num: member_num,
                      answer_num: todayMyA[0].answer_num,
                    },
                  },
                };
              } else {
                return { pathname: `/365` };
              }
            } else if (todayMyTrashA && location.onClicked) {
              alert("휴지통에 오늘 답변이 존재합니다");
              return { pathname: "/365" };
            } else {
              return { pathname: "/write" };
            }
          }
        }}
        onClick={handleClick}
      >
        <button id="goWriteBtn">
          <p>오늘 나의 생각 남기기</p>
          <img src={Vector} alt="vector"></img>
        </button>
      </Link>
      <div id={props.isMobile ? "bottom_mobile" : "bottom"}>
        <div className={props.isMobile ? "bottom_textBox_mobile" : "bottom"}>
          <p>365개의 질문,</p>
          <p>그리고 나와 나를 연결할 기록들.</p>
          <p>
            매일 달라지는 질문에 답해보세요. 사소하지만 큰 기록은 분명 당신과
            당신을 이어주는 고리가 될거예요. 3년 동안의 기록을 차곡차곡 모으고,
            찬찬히 나를 만나봐요.
          </p>
        </div>
        <img
          className={props.isMobile ? "bgImg_mobile" : "bgImg"}
          alt="bgImg"
          src={main}
        ></img>
      </div>
      <div className="backColor"></div>
    </div>
  );
}

export default Home;
