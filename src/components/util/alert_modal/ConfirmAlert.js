import React from "react";
import { Link } from "react-router-dom";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";
import xxxxx from "../../../styles/images/xxxxx.png";
import * as M from "../alert_modal/modal.style";

export const ConfirmAlert = ({ closeConfirmModal, todayMyA, member_num, day, question }) => {
    useKeyEscClose(closeConfirmModal);
    return (
        <M.ModalWrapper onClick={() => closeConfirmModal()}>
            <M.TrashDeleteModal>
                <M.ModalCloseXBtn onClick={() => closeConfirmModal()} src={xxxxx} />
                <M.TrashModalTitile>오늘 답변이 이미 존재합니다! </M.TrashModalTitile>
                <M.TrashModalTitileContent>수정하시겠습니까 ? </M.TrashModalTitileContent>
                <M.ModalBtnBox>
                    <M.ModalBtns name="cancelFake" onClick={() => closeConfirmModal()}>
                        취소하기
                    </M.ModalBtns>
                    <Link
                        to={(location) => {
                            return {
                                pathname: `/write/${day}`,
                                state: {
                                    question: question,
                                    data: {
                                        answer: todayMyA[0].answer,
                                        public_answer: todayMyA[0].public_answer,
                                        answer_date: todayMyA[0].answer_date,
                                        answer_year: todayMyA[0].answer_year,
                                        member_num: member_num,
                                        answer_num: todayMyA[0].answer_num,
                                    },
                                },
                            };
                        }}
                    >
                        <M.ModalBtns name="cancel">수정하기</M.ModalBtns>
                    </Link>
                </M.ModalBtnBox>
            </M.TrashDeleteModal>
        </M.ModalWrapper>
    );
};
