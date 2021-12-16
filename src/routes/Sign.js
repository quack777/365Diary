import React from "react";
import signupImage from "../images/signupImage.png";
import rigthArrow from '../images/Vector 1.png';
import './Sign.css';

function Signup() {
  return(
    <div className="Signup">
      <section>
        <img src={signupImage}></img>
        <p>어떤 설명 사이트에 대한 설명</p>
        <p>어떤 설명 사이트에 대한 설명</p>
        <div>
          <img src={rigthArrow}></img>
          <img src={rigthArrow}></img>
        </div>
      </section>
      <section>
        <p>회원가입</p>
        <p>회원이 되어 매일 나를 위한 질문을 받아보세요</p>
        <form>
          <input id="id"type="text" required></input>
          <input id="pwd"type="password" required></input>
          <p>카카오계정저장</p>
          <p>로그인</p>
        </form>
      </section>
    </div>
  )
}

export default Signup;