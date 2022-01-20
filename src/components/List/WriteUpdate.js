import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import toggle_unselected from "../../styles/images/main_private.png";
import toggle_selected from "../../styles/images/main_public.png";
import axios from "axios";

import "../../styles/Write.css";
import { Alert } from "../util/alert_modal/alert";

function WriteUpdate() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const targetMonth = Number(location?.state?.data?.answer_date.slice(0, 2));
  const targetDate = Number(location?.state?.data?.answer_date) % 100;
  const targetYear = location?.state?.data?.answer_year;
  const [initialValue, setInitialValue] = useState(
    location?.state?.data?.answer
  );

  const answer_num = location.answer_num;

  const [question] = useState(location?.state?.question);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState(location?.state?.data?.public_answer);
  const [update, setUpdate] = useState(false);

  function writeSubmit(e) {
    e.preventDefault();
    axios({
      url: `/answers/pages`, // 임시 member => 1
      // /answers/pages/{answer_num}/{member_num}
      method: "patch",
      baseURL: process.env.REACT_APP_SERVER_IP,
      data: {
        answer_num: location.state.data.answer_num,
        answer: initialValue,
        public_answer: publica,
        member_num: location.state.data.member_num,
      },
    })
      .then(function (response) {
        // alert("수정 성공!");
        // history.replace("/list", { id, targetDate, targetMonth });
        setUpdate(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 2차. 수정 내용 가져오는 API
  const getUpdate = async () => {
    try {
      const res = await axios.get(`/answers/pages/${answer_num}`);
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  console.log(location);
  useEffect(() => {
    getUpdate();
  }, []);

  function inputCount(e) {
    const inputValue = e.target.value;
    setInitialValue(inputValue);
    // 한글이랑 영어 카운터 다름 해결필요
    setCount(inputValue.length);
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
      {update ? (
        <Alert goAway={"/list"} isClose={setUpdate} content={"수정"}></Alert>
      ) : null}
    </div>
  );
}
export default WriteUpdate;
