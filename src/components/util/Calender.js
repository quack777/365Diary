import React from "react";
import DatePicker from "react-datepicker";
import xxxxx from "../../styles/images/xxxxx.png";
import { useState } from "react";
import axios from "axios";

export default function Calender(props) {
  const [startDate, setStartDate] = useState(new Date());
  const member_num = sessionStorage.getItem("member_num");
  const handleChange = (date) => {
    setStartDate(date);
    const now = date;
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    getQuestion(day);
    getAnswer(day);
    props.setMonth(now.getMonth() + 1);
    props.setDate(now.getDate());
    props.setCalender(false);
  };

  function getQuestion(day) {
    axios
      .get(`http://13.125.34.8:8080/365Project/question/calendars/${day}`)
      .then(function (response) {
        props.setQuestion(response.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getAnswer(day) {
    axios
      .get(`http://13.125.34.8:8080/365Project/answers/${day}/${member_num}`)
      .then(function (response) {
        const answer = response.data.map((item) => item.answer);
        const answer_year = response.data.map((item) => item.answer_year);
        props.setDataAnswer(answer);
        props.setDataYear(answer_year);
        props.setAnswerAllData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function closeCanlender() {
    props.setCalender(false);
  }
  return (
    <div>
      <div className="calendar">
        <div className="calendar_close">
          <img src={xxxxx} alt="closeBtn" onClick={closeCanlender} />
        </div>
        <DatePicker
          selected={startDate}
          wrapperClassName="react-datepicker"
          onChange={(date) => {
            handleChange(date);
          }}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <>
              <button
                type="button"
                class="react-datepicker__navigation react-datepicker__navigation--previous"
                aria-label="Previous Month"
                onClick={decreaseMonth}
              >
                <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
                  Previous Month
                </span>
              </button>
              <div>{date.getMonth() + 1}월</div>
              <button
                type="button"
                class="react-datepicker__navigation react-datepicker__navigation--next"
                aria-label="Next Month"
                onClick={increaseMonth}
              >
                <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
                  Next Month
                </span>
              </button>
            </>
          )}
          dateFormat="MM월 dd일"
          inline
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3).toUpperCase()}
        />
      </div>
    </div>
  );
}
