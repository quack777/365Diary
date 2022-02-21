import React from "react";
import { useHistory } from "react-router-dom";
import * as M from "./modal.style";
import xxxxx from "../../../styles/images/xxxxx.png";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";

export function LoginAlert({ closeLoginAlert }) {
    const history = useHistory();
    useKeyEscClose(closeLoginAlert);
    return (
        <M.ModalWrapper onClick={() => closeLoginAlert()}>
            <M.TrashDeleteModal>
                <M.ModalCloseXBtn onClick={() => closeLoginAlert()} src={xxxxx}></M.ModalCloseXBtn>
                <M.TrashModalTitile>로그인이 필요한 기능입니다.</M.TrashModalTitile>
                <M.TrashModalTitileContent>로그인 후 이용해주세요.</M.TrashModalTitileContent>
                <M.ModalBtnBox>
                    <M.ModalBtns name="cancel" onClick={() => closeLoginAlert()}>
                        취소하기
                    </M.ModalBtns>
                    <M.ModalBtns
                        name="login"
                        onClick={() => {
                            closeLoginAlert();
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
