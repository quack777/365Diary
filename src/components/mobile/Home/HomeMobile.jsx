import React from "react";
import "../../../styles/mobile/Home.css";
import bottomImg from "../../../styles/images_mobile/home_bottomImg_mobile.png";
import createBtn from "../../../styles/images_mobile/home_createBtn_arrow.png";
export default function Home() {
  return (
    <div className="home_container">
      <div className="home_titleBox">
        <div className="home_titleBox_date">1월 1일</div>
        <div className="home_titleBox_question">오늘의 질문</div>
      </div>

      <div className="home_randomAnswers">답변들</div>
      <div className="home_createBtn_container">
        <div className="home_createBtn_wrapper">
          <div className="home_createBtn_text">
            오늘 나의 생각 남기기
            <img src={createBtn} alt="" style={{ paddingLeft: "7px" }} />
          </div>
        </div>
      </div>

      <div className="home_bottom_conatiner">
        <div className="home_bottomText">
          <div className="home_bottomText_content">
            365개의 질문들, <br />
            그리고 나오 나를 연결할 기록들.
          </div>
          <div className="home_bottomText_subContent">
            매일 달라지는 질문에 답해보세요. <br />
            3년 동안의 기록을 차곡차곡 모으고, 찬찬히 나를 만나봐요.
          </div>
        </div>
        <div className="home_bottom_img">
          <img
            src={bottomImg}
            alt="bottomIm g"
            style={{ width: "223px", height: "168px" }}
          />
        </div>
      </div>
    </div>
  );
}
