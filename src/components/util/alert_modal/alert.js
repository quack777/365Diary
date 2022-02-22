import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";
import alertCheck from "../../../styles/images/alertCheck.png";
import alertX from "../../../styles/images/alertX.png";
import * as A from "./alert.style";

export const Alert = ({ url, content, closeDeleteAlert }) => {
    const history = useHistory();
    const handleCloseBtn = () => {
        if (content !== "삭제" && content !== "answerInTrash") {
            history.push(url);
        } else {
            closeDeleteAlert();
        }
    };
    useKeyEscClose(handleCloseBtn);
    useEffect(() => {
        setTimeout(() => {
            handleCloseBtn();
        }, 2000);
    }, []);

    return (
        <A.AlertWrapper onClick={handleCloseBtn}>
            <A.AlertBox>
                <img alt="alertCheck" src={alertCheck}></img>
                <A.AlertContent>
                    {content === "answerInTrash"
                        ? "휴지통에 오늘 답변이 존재합니다."
                        : `일기가 정상적으로 ${content}되었습니다.`}
                </A.AlertContent>
                <img alt="alertX" src={alertX} onClick={handleCloseBtn}></img>
            </A.AlertBox>
        </A.AlertWrapper>
    );
};
