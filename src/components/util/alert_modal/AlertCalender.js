import React from "react";
import { useHistory } from "react-router-dom";
import warning from "../../../styles/images/warning.png";
import alertX from "../../../styles/images/alertX.png";

export default function AlertCalender({ calender, isClose }) {
    const cal = calender;
    return (
        <div className={cal ? `alert ${cal}` : "alert"}>
            <div className="alert_calender">
                <img src={warning}></img>
                <div className="textBox">
                    <div>답변이 있을 경우에만 접근이 가능합니다.</div>
                    <div>해당 날짜 당일에 답변을 작성해보세요.</div>
                </div>
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
