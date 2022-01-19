import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import modify_normal from "../styles/images/modify_normal.png";
import Line from "../styles/images/Line45.png";
import delete_normal from "../styles/images/delete_normal.png";
import toggle_unselected from "../styles/images/list_private.png";
import toggle_selected from "../styles/images/list_public.png";
import girl from "../styles/images/Mask Group.png";
import "../styles/List.css";
import axios from "axios";

export default function List_answer({
  question,
  showDelete,
  answerAllData,
  stateOpen,
  stateClose,
  public_answer,
  date,
  month,
  dataYear,
  selectedYear,
  member_num,
}) {
  const dt = new Date();
  var nowDate =
    dt.getFullYear().toString() +
    (dt.getMonth() + 1).toString().padStart(2, "0") +
    dt.getDate().toString().padStart(2, "0");

  const monthToString = month + "";
  const targetDate =
    selectedYear.toString() + monthToString.padStart(2, "0") + date;

  const [answersFromTrash, setAnswersFromTrash] = useState([]);
  const [isInTrash, setIsInTrash] = useState(false);
  const [todayAnswersInTrash, setTodayAnswersInTrash] = useState([]);

  const getAnswersFromTrash = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/trashes/${member_num}`
      );

      setAnswersFromTrash(res.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const filter = () => {
    const res = answersFromTrash.filter((v) => {
      if (v.answer_year + v.answer_date === nowDate) {
        return v;
      }
    });
    if (res.length > 0) {
      setTodayAnswersInTrash(res);
      setIsInTrash(true);
    }
  };

  useEffect(() => {
    getAnswersFromTrash();
  }, []);

  useEffect(() => {
    filter();
  }, [answersFromTrash]);

  function TodayWrite({ todayAnswersInTrash }) {
    console.log("todayAnswersInTrash: ", todayAnswersInTrash);
    const location = useLocation();
    const handleClick = () => {
      location.onClicked = true;
    };
    return (
      <div>
        <div className="TodayWrite">
          <div>
            <img src={girl} alt="ㅎㅇ"></img>
            <p>오늘의 질문입니다. 지금은 나의 생각을 남겨보세요!</p>
          </div>
          <Link
            onClick={handleClick}
            to={(location) => {
              if (location.onClicked && isInTrash) {
                alert("이미 등록된 답변이 존재합니다. 휴지통을 확인해 주세요.");
                return {
                  // pathname: `/write/${todayAnswersInTrash[0].answer_num}`,
                  // answer_num: todayAnswersInTrash[0].answer_num,
                  pathname: "/list",
                };
              } else {
                return { pathname: "/write" };
              }
            }}
          >
            <p>답변작성하기</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="List">
      {answerAllData.length > 0 ? (
        answerAllData.map((data, index) => {
          return (
            <div className="list">
              <hr></hr>
              <div className="watch">
                <p>{data.answer_year}년의 나:</p>
                <p>{data.answer}</p>
              </div>
              <div className="buttons">
                {public_answer[index] === "Y" ? (
                  <img
                    src={toggle_selected}
                    alt="public"
                    onClick={() => stateOpen(index)}
                  ></img>
                ) : (
                  <img
                    src={toggle_unselected}
                    alt="private"
                    onClick={() => stateClose(index)}
                  ></img>
                )}
                {targetDate === nowDate ? (
                  <>
                    <Link
                      to={{
                        pathname: `/write/${data.answer_num}`,
                        state: { data, question },
                      }}
                    >
                      <div>
                        <img src={modify_normal}></img>
                      </div>
                    </Link>
                    <img src={Line}></img>
                  </>
                ) : null}

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => showDelete(index)}
                >
                  <img src={delete_normal}></img>
                </div>
              </div>
            </div>
          );
        })
      ) : // <TodayWrite />
      targetDate === nowDate ? (
        <TodayWrite todayAnswersInTrash={todayAnswersInTrash} />
      ) : (
        <div>당일만 작성 가능</div>
      )}
    </div>
  );
}
