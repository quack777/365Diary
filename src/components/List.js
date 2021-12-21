import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
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
import girl from "../styles/images/Mask Group.png"

function List() {
  const location = useLocation();
  const history = useHistory();

  const NewDate = new Date();
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

  const [deletes, setDeletes] = useState(false);
  const [calender, setCalender] = useState(false);
  const [value, onChange] = useState(new Date());
  const [question, setQuestion] = useState("나의 삶의 목적은 무엇인가요?");
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState("N");
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
  const [answerAllData, setAnswerAllData] = useState(["0"]);
  const [public_answer, setPublic_answer] = useState(["N"]);
  const deleteModalContainer = useRef();

  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay) + 1;
  const [dayNum] = useState(
    location.state === undefined ? day : Number(location.state.id)
  );

  console.log("location: ", location);
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
    const member_num = localStorage.getItem("member_num");
    setMember(Number(member_num));
    await axios
      .get(`/answers/${dayNum}/1`, { baseURL: "http://61.72.99.219:9130" })
      .then(function (response) {
        console.log(response.data);
        setDataYear(response.data.map((item) => item.answer_year));
        setDataAnswer(response.data.map((item) => item.answer));
        setAnswerNum(response.data.map((item) => item.answer_num));
        setPublic_answer(response.data.map((item) => item.public_answer));
        setAnswerAllData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setDataYear, setDataAnswer, setAnswerNum, setAnswerAllData, dayNum]);

  const getQuestion = useCallback(async () => {
    await axios
      .get(`/question/calendars/${dayNum}`, {
        baseURL: "http://61.72.99.219:9130",
      })
      .then(function (response) {
        console.log(response.data);

        setQuestion(response.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setQuestion, dayNum]);

  useEffect(() => {
    getQuestion();
    getAns();
  }, [getAns, getQuestion]);

  function goTrash() {
    setDataAnswer(dataAnswer.filter((answer, index) => index !== deleteIndex)); //실제에서는 .then안에
    const aN = answerNum[deleteIndex];

    axios({
      url: `/answers/trashes/${aN}/1`,
      method: "patch",
      baseURL: "http://61.72.99.219:9130",
      data: {
        answer_delete: "Y", //삭제이기때문에 항상 y로
        delete_date: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0], //오늘날짜로, date타입
      },
    })
      .then((response) => {
        if (response.status === 200) alert("삭제 성공!");
        setDeletes(false);
        setAnswerNum(answerNum.filter((an, index) => index !== deleteIndex));
        getAns();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function patchPublic(pa, index) {
    axios({
      url: `/settings/${answerAllData[index].answer_num}/1`,
      method: "patch",
      baseURL: "http://61.72.99.219:9130/",
      data: {
        public_answer: pa
      }
    })
    .then((response) => {
      console.log(response)
    })
    .error((error) => {
      console.log(error)
    })
  }

  function stateClose(index) {
    setOpen(true);
    setPublica("N");
    public_answer[index] = "Y";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index)
  }

  function stateOpen(index) {
    setOpen(false);
    setPublica("Y");
    public_answer[index] = "N";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index)
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
      
      {/* 이것은 당일에 해당하는 답변이 없을 떄만 보여주어야 합니다 */}
      <TodayWrite />

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

function TodayWrite() {
  return(
    <div className="TodayWrite">
      <div>
        <img src={girl} alt="ㅎㅇ"></img>
        <p>오늘의 질문입니다. 지금은 나의 생각을 남겨보세요!</p>
      </div>
      <Link to="/write">
        <p>답변작성하기</p>
      </Link>
    </div>
  )
}

export default List;
