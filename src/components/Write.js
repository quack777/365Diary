import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import toggle_unselected from "../styles/images/main_private.png";
import toggle_selected from "../styles/images/main_public.png";
import axios, { Axios } from "axios";

import "../styles/Write.css";

function Write() {
  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();
  const year = NewDate.getFullYear();
  
  const [question, setQuestion] = useState("나의 삶의 목적은 무엇인가요?");
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState("N");
  const [questionN, setQuestionN] = useState();
  const [member, setMember] = useState();
  // month date year도 내 일기장에서 선택된 날짜로 값이 바껴야함
  const [cMonth, setCMonth] = useState();
  const [cDate, setCDate] = useState();
  const [cYear, setCYear] = useState();
  
  const loca = useLocation();
  console.log(loca)
  const match = useRouteMatch();
  const paramsQN = match.params.question_num;
  console.log(paramsQN)

  function writeSubmit(e) {
    if(paramsQN === undefined) {
      e.preventDefault();
      console.log(answer);
      const inputValue = e.target[0].value;
      e.target[0].value = "";
      console.log("submit");
      setCount(0);
      setAnswer("");
  
      const now = new Date();
      const year = String(now.getFullYear());
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const answerDate = `${month}${date}`;
  
      console.log(year);
      console.log(answerDate);
      console.log(answer);
      console.log(publica);
      console.log(questionN);
      console.log(typeof member);
      axios
        .post("http://61.72.99.219:9130/answers/new", {
          answer_year: year,
          answer_date: answerDate,
          answer: answer,
          public_answer: publica,
          question_num: questionN,
          member_num: member,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      e.preventDefault();
      axios
        .patch({
          url: `/answers/pages/${loca.state.data.answer_num}/${member}`, // /answers/pages/{answer_num}/{member_num}
          baseURL: "http://61.72.99.219:9130/",
          data: {
            answer : loca.state.data.answer,
            public_answer : loca.state.data.public_answer,
            answer_num: loca.state.data.answer_num,
            member_num: loca.state.data.member
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function inputCount(e) {
    const inputValue = e.target.value;
    let count = inputValue.length;
    // 한글이랑 영어 카운터 다름 해결필요
    setAnswer(inputValue);
    console.log(answer);
    setCount(count);
  }

  function stateClose() {
    setOpen(true);
    setPublica("N");
  }

  function stateOpen() {
    setOpen(false);
    setPublica("Y");
  }

  function sendData() {
    console.log(answer);
  }

  useEffect(() => {
    if(paramsQN === undefined) {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const day = Math.floor(diff / oneDay) + 1;
  
      const member_num = localStorage.getItem("member_num");
      setMember(Number(member_num));
  
      axios({
        url: `/question/${day}`,
        method: "get",
        baseURL: "http://61.72.99.219:9130",
        //withCredentials: true,
      })
        .then(function (response) {
          console.log(response.data);
          setQuestion(response.data.question);
          setQuestionN(response.data.question_num);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios({
        url: `/question/calendars/${paramsQN}`,
        method: "get",
        baseURL: "http://61.72.99.219:9130",
        //withCredentials: true,
      })
        .then(function (response) {
          console.log(response.data);
          setQuestion(response.data.question);
          setQuestionN(response.data.question_num);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }, []);


  return (
    <div className="Write">
      <div className="questions">
        <p>
          {month}월 {date}일, {year}
        </p>
        <div>
          <p>{question}</p>
        </div>
      </div>
      <form onSubmit={writeSubmit} className="writeBox">
        <textarea
          onInput={inputCount}
          maxLength="200"
        >{loca?.state?.data.answer}</textarea>
        <p>{count}/200</p>
        <div>
          <div className="private">
            {open ? (
              <img src={toggle_selected} onClick={stateOpen}></img>
            ) : (
              <img src={toggle_unselected} onClick={stateClose}></img>
            )}
          </div>
          <div className="twoBtn">
            <Link to="/365">
              <p id="first">작성취소</p>
            </Link>
            <button id="second" type="submit">
                api임시테스트용
            </button>
            <Link to="/list">
              <button id="second" type="submit">
                저장하기
              </button>
            </Link>
            </div>
        </div>
      </form>
    </div>
  );
}
export default Write;
