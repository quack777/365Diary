import React from "react";
import { useHistory } from "react-router-dom";
import alertCheck from "../styles/images/alertCheck.png";
import alertX from "../styles/images/alertX.png";

export const Alert = ({goAway, content}) => {
  const history = useHistory();
  return(
    <div className="bigAlert">
      <div className="alert">
        <img src={alertCheck}></img>
        <span>글이 정상적으로 {content}되었습니다.</span>
        <img src={alertX} onClick={() => history.push(goAway)}></img>
      </div>
    </div>
  )
}