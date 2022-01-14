import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../styles/List.css";
import monthBTN from "../styles/images/monthBTN.png";
import xxxxx from "../styles/images/xxxxx.png";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Calender from "./util/Calender";
import ListAnswerComponent from "./ListAnswerComponent";
import { unstable_batchedUpdates } from "react-dom";

function List() {
  const location = useLocation();
  const history = useHistory();

  // 다이렉트로 url 접근 시 뒤로가기
  // const getId = sessionStorage.getItem("id");
  // if (getId === null) history.goBack(-1);

  const [deletes, setDeletes] = useState(false);
  const [calender, setCalender] = useState(false);
  const [question, setQuestion] = useState();
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState("N");
  const [dataAnswer, setDataAnswer] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [member, setMember] = useState();
  const [deleteIndex, setDelteIndex] = useState();
  const [answerNum, setAnswerNum] = useState();
  const [answerAllData, setAnswerAllData] = useState([]);
  const [public_answer, setPublic_answer] = useState(["N"]);
  const [questionNum, setQuestionNum] = useState(0);

  const deleteModalContainer = useRef();

  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);

  const [answerDate, setAnswerDate] = useState(
    location.state === undefined ? day : Number(location.state.id)
  );

  const [month, setMonth] = useState(
    location.state === undefined
      ? new Date().getMonth() + 1
      : location.state.targetMonth
  );
  const [date, setDate] = useState(
    location.state === undefined
      ? new Date().getDate()
      : location.state.targetDate
  );
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
  const getAns = useCallback(async () => {
    const member_num = sessionStorage.getItem("member_num");
    setMember(Number(member_num));

    await axios
      .get(`http://13.125.34.8:8080/365Project/answers/${date}/${member_num}`)
      .then(function (response) {
        unstable_batchedUpdates(() => {
          setDataYear(response.data.map((item) => item.answer_year));
          setAnswerDate(response.data.map((item) => item.answer_date));
          setDataAnswer(response.data.map((item) => item.answer));
          setAnswerNum(response.data.map((item) => item.answer_num));
          setPublic_answer(response.data.map((item) => item.public_answer));
          setAnswerAllData(response.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [date]);

  const getQuestion = useCallback(async () => {
    await axios
      .get(`http://13.125.34.8:8080/365Project/question/calendars/${date}`)
      .then(function (response) {
        setQuestion(response.data.question);
        setQuestionNum(response.data.question_num);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setQuestion, date]);

  useEffect(() => {
    getQuestion();
    getAns();
  }, [getAns, getQuestion]);

  function goTrash() {
    setDataAnswer(dataAnswer.filter((answer, index) => index !== deleteIndex)); //실제에서는 .then안에

    axios({
      url: `/answers/trashes`,
      method: "PATCH",
      baseURL: "http://13.125.34.8:8080/365Project/",
      data: {
        answer_num: answerAllData[deleteIndex].answer_num,
        answer_delete: answerAllData[deleteIndex].answer_delete, //삭제이기때문에 항상 y로
        delete_date: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0], //오늘날짜로, date타입
        member_num: member,
        question_num: answerAllData[deleteIndex].question_num,
      },
    })
      .then((response, request) => {
        if (response.status === 200) alert("삭제 성공!");
        setDeletes(false);
        setAnswerAllData(
          answerAllData.filter((data, index) => index !== deleteIndex)
        );
        getAns();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function patchPublic(pa, index) {
    const aN = answerAllData[index].answer_num;
    axios({
      url: `/settings`,
      method: "patch",
      baseURL: "http://13.125.34.8:8080/365Project/",
      data: {
        public_answer: pa,
        answer_num: aN,
        member_num: member,
      },
    })
      .then((response) => {
        console.log(response);
        pa = "Y"
          ? alert("답변이 비공개 됐습니다")
          : alert("답변이 전체공개 됐습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function stateClose(index) {
    setOpen(true);
    setPublica("N");
    public_answer[index] = "Y";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index);
  }

  function stateOpen(index) {
    setOpen(false);
    setPublica("Y");
    public_answer[index] = "N";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index);
  }

  const selectedDate = dataYear[0] + answerDate[0];
  console.log("answerDate[0]: ", answerDate[0]);
  console.log(" dataYear[0]: ", dataYear[0]);

  return (
    <div className="List">
      <div className="questions">
        <div>
          <p>
            {month}월 {date}일
          </p>
          <p>{question}</p>
        </div>
        <img
          src={monthBTN}
          alt="seeCalenderBtn"
          style={{ cursor: "pointer" }}
          onClick={seeCalender}
        />
      </div>

      {/* 이것은 당일에 해당하는 답변이 없을 떄만 보여주어야 합니다 */}

      <ListAnswerComponent
        showDelete={showDelete}
        dataAnswer={dataAnswer}
        dataYear={dataYear}
        answerAllData={answerAllData}
        question={question}
        answerNum={answerNum}
        open={open}
        stateOpen={stateOpen}
        stateClose={stateClose}
        public_answer={public_answer}
        day={day}
        selectedDate={selectedDate}
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
          setAnswerAllData={setAnswerAllData}
          setMonth={setMonth}
          setDate={setDate}
        />
      ) : null}
    </div>
  );
}

export default List;
