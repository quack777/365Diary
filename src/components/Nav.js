import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import './Nav.css';

function Nav() {
  const [active, setActive] = useState([0, 0, 0, 0]);

  function selectPath(pathname) {
    console.dir(pathname.target.textContent);
    if(pathname.target.textContent === "소개") {
      const copy = [1, 0, 0, 0];
      setActive(copy);
    } else if (pathname.target.textContent === "내 일기장") {
      const copy = [0, 1, 0, 0];
      setActive(copy);
    } else if (pathname.target.textContent === "휴지통") {
      const copy = [0, 0, 1, 0];
      setActive(copy);
    } else if (pathname.target.textContent === "로그인/회원가입") {
      const copy = [0, 0, 0, 1];
      setActive(copy);
    }
  } 
  
  function mainClick() {
    setActive([0, 0, 0, 0]);
  }
  return(
    <div className="Nav">
      <Link to="/365"><p id="logo" onClick={mainClick}>365</p></Link>
      <div id="nav_btn" onClick={selectPath}>
        <Link to="/introduce">{active[0] === 1 ? <p className="bctive">소개</p>:<p>소개</p>}</Link>
        <Link to="/list">{active[1] === 1 ? <p className="bctive">내 일기장</p> :<p>내 일기장</p>}</Link>
        <Link to="/trash">{active[2] === 1 ? <p className="bctive">휴지통</p> :<p>휴지통</p>}</Link>
        <Link to="/login">{active[3] === 1 ? <p className="bctive">로그인/회원가입</p> :<p>로그인/회원가입</p>}</Link>
      </div>
    </div>
  )
}

export default Nav;