import React from 'react'
import "../../../styles/mobile/Home.css"
import bottomImg from "../../../styles/images_mobile/home_bottomImg_mobile.png"

export default function Home() {
    return (
        <div className="home_container">

            <div className="home_wrapper">

                <div className="home_titleBox">
                    <div className="home_titleBox_date">
                        1월 1일
                    </div>

                    <div className="home_titleBox_question">
                        오늘의 질문
                    </div>

                </div>

                <div className="home_randomAnswers">
                    답변들

                </div>
                <div className="home_createBtn_container">
                    <div className="home_createBtn_wrapper">
                        <div className="home_createBtn_text">

                            오늘 나의 생각 남기기
                        </div>
                    </div>


                </div>

                <div className="home_bottom_conatiner">

                    <div className="home_bottom_text">
                        <span>
                            365개의 질문들, <br/>
                            그리고 나오 나를 연결할 기록들.
                        </span>
                        <span>
                        매일 달라지는 질문에 답해보세요. 3년 동안의 기록을 차곡차곡 모으고, 찬찬히 나를 만나봐요.
                        </span>
                    </div>
                    <div className="home_bottom_img">
                            <img src={bottomImg} alt="bottomImg" style={{width:"223px", height:"168px"}}/>
                    </div>
                </div>
            </div>
            

        </div>
    )
}
