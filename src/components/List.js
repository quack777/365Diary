import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, Route } from "react-router-dom";
import "../styles/List.css";
import modify_normal from "../styles/images/modify_normal.png";
import Line from "../styles/images/Line45.png";
import monthBTN from "../styles/images/monthBTN.png";
import delete_normal from "../styles/images/delete_normal.png";
import xxxxx from "../styles/images/xxxxx.png";
import Calendar from "react-calendar";
import axios from "axios";
import Modify from "./Modify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Calender from "./util/Calender";
import ListAnswerComponent from "./ListAnswerComponent";

function List() {
  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();

  const [deletes, setDeletes] = useState(false);
  const [calender, setCalender] = useState(false);
  const [value, onChange] = useState(new Date());
  const [question, setQuestion] = useState("나의 삶의 목적은 무엇인가요?");
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(
    "나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 200자 일 때 모습입니다"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [dataAnswer, setDataAnswer] = useState([
    "나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 나의 답변은 이렇다 나는 이렇게 생각하고 저렇게 생각한다 나는 이러쿵 저러쿵 200자 일 때 모습입니다",
  ]);
  const [dataYear, setDataYear] = useState(["2020"]);
  const [member, setMember] = useState();
  const [deleteIndex, setDelteIndex] = useState();
  const [answerNum, setAnswerNum] = useState();

  const deleteModalContainer = useRef();
  function showDelete(index) {
    setDeletes(true);
    setDelteIndex(index);
  }

  function xDelete() {
    setDeletes(false);
  }

  function seeCalender() {
    setCalender(true);
  }

  function closeCanlender() {
    setCalender(false);
  }

  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay) + 1;

  const getAns = useCallback(async () => {
    const member_num = localStorage.getItem("member_num");
    setMember(Number(member_num));
    await axios
      .get(`/answers/${day}/1`, { baseURL: "http://61.72.99.219:9130" })
      .then(function (response) {
        const answer = response.data.map((item) => item.answer);
        const answer_year = response.data.map((item) => item.answer_year);
        const answer_num = response.data.map((item) => item.answer_num);
        setDataYear(answer_year);
        setDataAnswer(answer);
        setAnswerNum(answer_num);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setDataYear, setDataAnswer, setAnswerNum, day]);

  const getQuestion = useCallback(async () => {
    await axios
      .get(`/question/${day}`, {
        baseURL: "http://61.72.99.219:9130",
      })
      .then(function (response) {
        setQuestion(response.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setQuestion, day]);

  useEffect(() => {
    getAns();
    getQuestion();
  }, [getAns, getQuestion]);

  function goTrash() {
    setDataAnswer(dataAnswer.filter((answer, index) => index !== deleteIndex)); //실제에서는 .then안에
    const aN = answerNum[deleteIndex];

    axios
      .patch(`/answers/trashes/${aN}/${member}`, {
        baseURL: "http://61.72.99.219:9130",
      })
      .then((response) => {
        console.log(response);
        setAnswerNum(answerNum.filter((an, index) => index !== deleteIndex));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="List">
      <div className="questions">
        <div>
          <p>
            {month}월 {date}일
          </p>
          <p>{question}</p>
        </div>
        <img src={monthBTN} alt="seeCalenderBtn" onClick={seeCalender} />
      </div>

      <ListAnswerComponent
        showDelete={showDelete}
        dataAnswer={dataAnswer}
        dataYear={dataYear}
      />

      {deletes ? (
        <div className="deleteModal" ref={deleteModalContainer}>
          <img onClick={xDelete} src={xxxxx}></img>
          <p>답변을 정말 삭제하시겠어요?</p>
          <p>삭제된 답변은 휴지통에 일주일 동안 보관됩니다</p>
          <section>
            <p onClick={goTrash}>삭제하기</p>
            <p onClick={xDelete}>취소하기</p>
          </section>
        </div>
      ) : null}

      {calender ? (
        <Calender
          setDataYear={setDataYear}
          setDataAnswer={setDataAnswer}
          setQuestion={setQuestion}
          setCalender={setCalender}
        />
      ) : null}
    </div>
  );
}

export default List;
