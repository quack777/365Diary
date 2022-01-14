import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Nav.css";

function Nav(props) {
  const location = useLocation();

  location.isLogged = (sessionStorage.getItem("nickname") && true) || false;
  location.onClicked = false;

  const NavCssflag = location.pathname.slice(1);

  const handleClick = () => (location.onClicked = true);

  return (
    <div className={props.isMobile ? "Nav_mobile" : `Nav ${NavCssflag}`}>
      <Link to="/365">
        <p id="logo">365</p>
      </Link>
      <div id="nav_btn">
        <Link to="/introduce">
          <p className={location.pathname === "/introduce" ? "bctive" : ""}>
            소개
          </p>
        </Link>
        <Link
          to={(location) => {
            if (!location.isLogged && location.onClicked) {
              alert("로그인이 필요합니다!");
              return { pathname: "/365" };
            } else {
              return { pathname: "/list" };
            }
          }}
          onClick={handleClick}
        >
          <p className={location.pathname === "/list" ? "bctive" : ""}>
            내 일기장
          </p>
        </Link>
        <Link
          to={(location) => {
            if (!location.isLogged && location.onClicked) {
              alert("로그인이 필요합니다!");
              return { pathname: "/365" };
            } else {
              return { pathname: "/trash" };
            }
          }}
          onClick={handleClick}
        >
          <p className={location.pathname === "/trash" ? "bctive" : ""}>
            휴지통
          </p>
        </Link>
        {!location.isLogged ? (
          <Link to="/login">
            <p className={location.pathname === "/login" ? "bctive" : ""}>
              로그인/회원가입
            </p>
          </Link>
        ) : (
          <Link to="/logoutRoute">
            <p>로그아웃</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
