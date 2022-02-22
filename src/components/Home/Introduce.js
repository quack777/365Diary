import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import Introduce_top from "../../styles/images/07.png";
import ballon from "../../styles/images/Group 5582.png";
import ballonMobile from "../../styles/images/ballon_mobile.png";
import made_people from "../../styles/images/made_people.png";
import made_people_mobile from "../../styles/images/made_people_mobile.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../styles/Introduce.css";
import { slideData, slideDataMobile } from "./slideData";

const Introduce = ({ isMobile }) => {
    const location = useLocation();

    const mobileSwipe = useSwipeable({
        onSwipedRight: () => prevSlide(),
        onSwipedLeft: () => nextSlide(),
        preventDefaultTouchmoveEvent: false,
        trackMouse: true,
        trackTouch: true,
    });

    location.isLogged = (sessionStorage.getItem("nickname") && true) || false;
    const [current, setCurrent] = useState(0);
    const length = slideData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slideData) || slideData.length <= 0) {
        return null;
    }

    return (
        <div className="Introduce" style={{ overflow: isMobile && "hidden" }}>
            <section className={isMobile ? "top topMobile" : "top"}>
                <p>365 소개</p>
                <hr style={{ display: !isMobile && "none" }}></hr>
                <p>3년동안 365개의 질문에 대한 답변을 관리할 수 있는웹, 앱 다이어리 서비스입니다</p>
            </section>
            <hr style={{ display: isMobile && "none" }}></hr>
            <img src={Introduce_top} alt="Introduce_top" id={isMobile && "Introduce_top_mobile"}></img>
            <section className={isMobile ? "second secondMobile" : "second"}>
                <p>365개의 질문, 그리고 나와 나를 연결할 기록들.</p>
                <img src={isMobile ? ballonMobile : ballon}></img>
                <p>
                    생각해보신적이 있나요? 매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은 분명 당신과 당신을
                    이어주는 고리가 될거에요. 3년동안의 기록을 차곡차곡 모으고, 날짜별로 내 답변을 보면서 찬찬히 나를
                    만나봐요. 당신이 당신을 만날수 있도록 저희 365가 도와드릴게요.{" "}
                </p>
            </section>
            <hr></hr>
            <section className={isMobile ? "casual casual_mobile" : "casual"} {...mobileSwipe}>
                <p>365 알차게 사용하기</p>
                <div id="clickBtns" style={{ display: isMobile && "none" }}>
                    <button onClick={prevSlide}></button>
                    <button onClick={nextSlide}></button>
                </div>
                {isMobile
                    ? slideDataMobile.map((slide, index) => (
                          <div className={index === current ? "slide active" : "slide"} key={index} {...mobileSwipe}>
                              {index === current && <img src={slide.img} className="image" />}
                          </div>
                      ))
                    : slideData.map((slide, index) => (
                          <div className={index === current ? "slide active" : "slide"} key={index} {...mobileSwipe}>
                              {index === current && <img src={slide.img} className="image" />}
                              {index === current && <p>{slide.title}</p>}
                              {index === current && <p>{slide.pp}</p>}
                          </div>
                      ))}
                <div className="introSlideNav">
                    {isMobile
                        ? slideDataMobile.map((slide, index) => {
                              return <button className={current === index ? "introSlideNavActive" : null}></button>;
                          })
                        : slideData.map((slide, index) => {
                              return <button className={current === index ? "introSlideNavActive" : null}></button>;
                          })}
                </div>
            </section>
            <section className={isMobile ? "goHome goHome_mobile" : "goHome"}>
                <p>“나와 나를 연결할 준비, 되셨나요?”</p>
                {location.isLogged ? (
                    <Link to="/list">
                        <p>365 시작하기</p>
                    </Link>
                ) : (
                    <Link to="/login">
                        <p>365 시작하기</p>
                    </Link>
                )}
            </section>
            <section className={isMobile ? "bottom bottom_mobile" : "bottom"}>
                <p>만든 사람들</p>
                <img
                    alt="만든 사람들"
                    className={isMobile && "madePeopleImg_mobile"}
                    src={isMobile ? made_people_mobile : made_people}
                ></img>
            </section>
        </div>
    );
};

export default Introduce;
