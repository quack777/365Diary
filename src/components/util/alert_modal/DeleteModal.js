import React, { useEffect } from "react";
import xxxxx from "../../../styles/images/xxxxx.png";
import styled from "styled-components";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";

export default function DeleteModal({ content, xDelete, goTrash }) {
  /* useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        xDelete();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []); */
  useKeyEscClose(xDelete);

  return (
    <ModalWrapper onClick={xDelete}>
      <TrashDeleteModal>
        <ModalCloseXBtn onClick={xDelete} src={xxxxx}></ModalCloseXBtn>
        <TrashModalTitile>{content} 정말 비우시겠어요?</TrashModalTitile>
        <TrashModalTitileContent>
          휴지통에서 삭제하면 답변을 복구할 수 없습니다
        </TrashModalTitileContent>
        <ModalBtnBox>
          <ModalBtns name="delete" onClick={goTrash}>
            삭제하기
          </ModalBtns>
          <ModalBtns naem="cancel" onClick={xDelete}>
            취소하기
          </ModalBtns>
        </ModalBtnBox>
      </TrashDeleteModal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const TrashDeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 543px;
  height: 327px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 20px 100px rgb(156 156 156 / 15%);
  border-radius: 16px;
  z-index: 4;
`;

const ModalCloseXBtn = styled.img`
  position: relative;
  bottom: 25px;
  align-self: flex-end;
  margin-right: 25px;
  cursor: pointer;
`;

const TrashModalTitile = styled.p`
  margin: 0 auto;
  color: #084861;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 22.5px;
`;

const TrashModalTitileContent = styled.p`
  color: #98999c;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
`;

const ModalBtnBox = styled.section`
  display: flex;
  height: 20%;
  align-self: center;
  justify-content: center;
  margin-top: 33px;
`;

const ModalBtns = styled.button`
  width: 148px;
  height: 55.5px;
  margin: 0 10px;
  padding: 11.25px 37.5px;
  border: 1.5px solid;
  border-radius: 12px;
  background-color: ${(props) =>
    props.name === "delete" ? "#F9F8F9" : " #7EB496"};
  color: ${(props) => (props.name === "delete" ? "#98999C" : "#F9F8F9")};
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 18.75px;
  line-height: 174.2%;
  cursor: pointer;
`;
