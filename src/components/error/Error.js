import React, { useEffect } from "react";
import errorImg from "../../styles/images/error.png";
import "../../styles/Error.css";
import { useHistory } from "react-router-dom";

function Error() {
    const history = useHistory();

    return (
        <div className="Error">
            <section>
                <p>ERROR!</p>
                <p>페이지에 접근할 수 있는 권한이 없어 해당 페이지를 연결할 수 없습니다.</p>
                <p>서비스 이용에 불편을 드려 죄송합니다.</p>
                <button onClick={() => history.goBack()}>이전 페이지</button>
            </section>
            <img src={errorImg} alt="errorImg"></img>
        </div>
    );
}

export default Error;
