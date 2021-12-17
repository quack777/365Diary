import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toggle_unselected from "../styles/images/main_private.png";
import toggle_selected from "../styles/images/main_public.png";

function Modify() {
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

  function writeSubmit(e) {
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

    axios
      .post("http://61.72.99.219:9130/answers/new", {
        answer_year: year,
        answer_date: answerDate,
        answer: answer,
        public_answer: publica,
        question_num: questionN,
        member_num: 1,
        answer_delete: null,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    axios({
      url: `/question/{question_num}`, // /question/{question_num}
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
  }, []);

  useEffect(() => {
    axios({
      url: `/answers/pages/{answer_num}`, // /answers/pages/{answer_num}
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
        <textarea onInput={inputCount} maxLength="200"></textarea>
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
            <Link to="/list">
              <p id="first">작성취소</p>
            </Link>
            <Link to="/list">
              <p id="second" onClick={sendData}>
                저장하기
              </p>
            </Link>
            {/* <button type="submit" id="second" onClick={sendData}>저장하기</button> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Modify;
