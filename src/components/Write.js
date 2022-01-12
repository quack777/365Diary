import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import toggle_unselected from "../styles/images/main_private.png";
import toggle_selected from "../styles/images/main_public.png";
import axios, { Axios } from "axios";

import "../styles/Write.css";

function Write() {
  const location = useLocation();
  const history = useHistory();

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
  const [content, setContent] = useState("");

  const loca = useLocation();

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  function writeSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const answerDate = `${month}${date}`;

    axios
      .post("http://13.125.34.8:8080/365Project/answers/new", {
        answer_year: year,
        answer_date: answerDate,
        answer: content,
        public_answer: publica,
        question_num: questionN,
        member_num: member, //임시
      })
      .then(function (response) {
        if (response.status === 200) alert("글 등록 완료");
        history.push("/list");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function inputCount(e) {
    const inputValue = e.target.value;
    setContent(inputValue);
    let count = inputValue.length;
    // 한글이랑 영어 카운터 다름 해결필요
    setCount(count);
  }

  function stateOpen() {
    setOpen(true);
    setPublica("Y");
  }

  function stateClose() {
    setOpen(false);
    setPublica("N");
  }

  useEffect(() => {
    const member_num = sessionStorage.getItem("member_num");
    setMember(Number(member_num));

    axios
      .get(`http://54.180.114.189:8080/365Project/question/calendars/${day}`)
      .then(function (response) {
        setQuestion(response.data.question);
        setQuestionN(response.data.question_num);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [day]);

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
          value={content}
          maxLength="200"
        ></textarea>
        <p>{count}/200</p>
        <div>
          <div className="private">
            {open ? (
              <img
                src={toggle_selected}
                alt="public"
                onClick={stateClose}
              ></img>
            ) : (
              <img
                src={toggle_unselected}
                alt="private"
                onClick={stateOpen}
              ></img>
            )}
          </div>
          <div className="twoBtn">
            <Link to="/365">
              <p id="first">작성취소</p>
            </Link>
            <button id="second" type="submit">
              저장하기
            </button>
          </div>
        </div>
      </form>
      <div className="backColor"></div>
      <div id="WriteBack"></div>
    </div>
  );
}
export default Write;
