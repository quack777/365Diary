import React from "react";
import { useHistory } from "react-router-dom";
import alertCheck from "../../../styles/images/alertCheck.png";
import alertX from "../../../styles/images/alertX.png";

export default function AlertTrash({ goAway, content, isClose }) {
  console.log("goAway: ", goAway);
  const history = useHistory();
  return (
    <div className="alert">
      <div className="alert_dup">
        <img src={alertCheck}></img>
        <span>휴지통에 오늘 답변이 존재합니다</span>
        <img
          src={alertX}
          onClick={() => {
            isClose(false);
          }}
        ></img>
      </div>
    </div>
  );
}
