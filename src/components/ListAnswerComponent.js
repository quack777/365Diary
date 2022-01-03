import React from "react";
import { Link } from "react-router-dom";
import modify_normal from "../styles/images/modify_normal.png";
import Line from "../styles/images/Line45.png";
import delete_normal from "../styles/images/delete_normal.png";
import toggle_unselected from "../styles/images/list_private.png";
import toggle_selected from "../styles/images/list_public.png";
import girl from "../styles/images/Mask Group.png";
import "../styles/List.css";

export default function List_answer({
  question,
  showDelete,
  answerAllData,
  stateOpen,
  stateClose,
  public_answer,
}) {
  function TodayWrite() {
    return (
      <div className="TodayWrite">
        <div>
          <img src={girl} alt="ㅎㅇ"></img>
          <p>오늘의 질문입니다. 지금은 나의 생각을 남겨보세요!</p>
        </div>
        <Link to="/write">
          <p>답변작성하기</p>
        </Link>
      </div>
    );
  }
  return (
    <div className="List">
      {answerAllData.length > 0 ? (
        answerAllData.map((data, index) => {
          console.log(public_answer);
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
                <Link
                  to={{
                    pathname: `/write/${data.question_num}`,
                    state: { data, question },
                  }}
                >
                  <div>
                    <img src={modify_normal}></img>
                  </div>
                </Link>
                <img src={Line}></img>
                <div onClick={() => showDelete(index)}>
                  <img src={delete_normal}></img>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <TodayWrite />
      )}
    </div>
  );
}
