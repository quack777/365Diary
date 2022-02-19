import styled from "styled-components";

export const ModalWrapper = styled.div`
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

export const TrashDeleteModal = styled.div`
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

export const ModalCloseXBtn = styled.img`
  position: relative;
  bottom: 25px;
  align-self: flex-end;
  margin-right: 25px;
  cursor: pointer;
`;

export const TrashModalTitile = styled.p`
  margin: 0 auto;
  color: #084861;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 22.5px;
`;

export const TrashModalTitileContent = styled.p`
  color: #98999c;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
`;

export const ModalBtnBox = styled.section`
  display: flex;
  height: 20%;
  align-self: center;
  justify-content: center;
  margin-top: 33px;
`;

export const ModalBtns = styled.button`
  width: ${(props) => (props.name === "login" ? "187px" : "148px")};
  height: 55.5px;
  margin: 0 10px;
  padding: 11.25px 37.5px;
  border: 1.5px solid;
  border-radius: 12px;
  background-color: ${(props) =>
    props.name === "cancel" ? "#7EB496" : "#F9F8F9"};
  color: ${(props) => (props.name === "cancel" ? "#F9F8F9" : "#98999C")};
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 18.75px;
  line-height: 174.2%;
  cursor: pointer;
`;
