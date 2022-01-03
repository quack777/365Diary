import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import toggle_unselected from "../styles/images/main_private.png";
import toggle_selected from "../styles/images/main_public.png";
import axios, { Axios } from "axios";

import "../styles/Write.css";

function WriteUpdate() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const targetMonth = Math.floor(Number(location.state.data.answer_date) / 100);
  const targetDate = Number(location.state.data.answer_date) % 100;
  const targetYear = location.state.data.answer_year;
  const [initialValue, setInitialValue] = useState(
    location?.state?.data.answer
  );

  const [question] = useState(location.state.question);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState(location.state.data.public_answer);
  console.log("location.state.data: ", location.state.data);

  function writeSubmit(e) {
    e.preventDefault();
    axios({
      url: `/answers/pages`, // 임시 member => 1
      // /answers/pages/{answer_num}/{member_num}
      method: "patch",
      // baseURL: "http://61.72.99.219:9130/",
      data: {
        answer_num: location.state.data.answer_num,
        answer: initialValue,
        public_answer: publica,
        member_num: location.state.data.member_num,
      },
    })
      .then(function (response) {
        alert("수정 성공!");
        history.replace("/list", { id, targetDate, targetMonth });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function inputCount(e) {
    const inputValue = e.target.value;
    setInitialValue(inputValue);
    // 한글이랑 영어 카운터 다름 해결필요
    setCount(inputValue.length);
  }

  function patchPublic() {
    axios({
      url: `/settings/${location.state.data.answer_num}/1`,
      method: "patch",
      baseURL: "http://61.72.99.219:9130/",
      data: {
        public_answer: publica,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function stateClose() {
    setOpen(false);
    setPublica("N");
  }

  function stateOpen() {
    setOpen(true);
    setPublica("Y");
  }

  function back() {
    history.replace("/list", { id, targetDate, targetMonth });
  }

  return (
    <div className="Write">
      <div className="questions">
        <p>
          {targetMonth}월 {targetDate}일, {targetYear}
        </p>
        <div>
          <p>{question}</p>
        </div>
      </div>
      <form onSubmit={writeSubmit} className="writeBox">
        <textarea
          onInput={inputCount}
          value={initialValue}
          maxLength="200"
        ></textarea>
        <p>{count}/200</p>
        <div>
          <div className="private">
            {publica === "Y" ? (
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
            <p onClick={back} id="first">
              작성취소
            </p>
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
export default WriteUpdate;
