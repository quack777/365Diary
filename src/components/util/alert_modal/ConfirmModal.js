import React from "react";
import { useHistory } from "react-router-dom";
import xxxxx from "../../../styles/images/xxxxx.png";
import "../../../styles/List.css";
import { Link, useLocation } from "react-router-dom";

export default function ConfirmModal({
  setConfirmModalOn,
  todayMyA,
  member_num,
  day,
  question,
}) {
  return (
    <div className="deleteModal">
      <img onClick={() => setConfirmModalOn(false)} src={xxxxx} />
      <p>오늘 답변이 이미 존재합니다! </p>
      <p>수정하시겠습니까 ? </p>
      <section>
        <p onClick={() => setConfirmModalOn(false)}>취소하기</p>
        <Link
          to={(location) => {
            return {
              pathname: `/write/${day}`,
              state: {
                question: question,
                data: {
                  answer: todayMyA[0].answer,
                  public_answer: todayMyA[0].public_answer,
                  answer_date: todayMyA[0].answer_date,
                  answer_year: todayMyA[0].answer_year,
                  member_num: member_num,
                  answer_num: todayMyA[0].answer_num,
                },
              },
            };
          }}
        >
          <p>수정하기</p>
        </Link>
      </section>
    </div>
  );
}
