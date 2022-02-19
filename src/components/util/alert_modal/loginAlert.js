import React from "react";
import { useHistory } from "react-router-dom";
import * as M from "./modal.style";
import xxxxx from "../../../styles/images/xxxxx.png";
import "../../../styles/loginAlert.css";

export function LoginAlert({ setLoginAlert }) {
  const history = useHistory();

  return (
    <M.ModalWrapper onClick={() => setLoginAlert(false)}>
      <M.TrashDeleteModal>
        <M.ModalCloseXBtn
          onClick={() => setLoginAlert(false)}
          src={xxxxx}
        ></M.ModalCloseXBtn>
        <M.TrashModalTitile>로그인이 필요한 기능입니다.</M.TrashModalTitile>
        <M.TrashModalTitileContent>
          로그인 후 이용해주세요.
        </M.TrashModalTitileContent>
        <M.ModalBtnBox>
          <M.ModalBtns name="cancel" onClick={() => setLoginAlert(false)}>
            취소하기
          </M.ModalBtns>
          <M.ModalBtns
            name="login"
            onClick={() => {
              setLoginAlert(false);
              history.push("/login");
            }}
          >
            로그인하기
          </M.ModalBtns>
        </M.ModalBtnBox>
      </M.TrashDeleteModal>
    </M.ModalWrapper>
  );
}
