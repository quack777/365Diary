import React from "react";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";
import * as M from "./modal.style";
import xxxxx from "../../../styles/images/xxxxx.png";

export const DeleteModal = ({ content, xDelete, goTrash }) => {
    useKeyEscClose(xDelete);

    return (
        <M.ModalWrapper onClick={xDelete}>
            <M.TrashDeleteModal>
                <M.ModalCloseXBtn onClick={xDelete} src={xxxxx}></M.ModalCloseXBtn>
                <M.TrashModalTitile>{content} 정말 비우시겠어요?</M.TrashModalTitile>
                <M.TrashModalTitileContent>휴지통에서 삭제하면 답변을 복구할 수 없습니다</M.TrashModalTitileContent>
                <M.ModalBtnBox>
                    <M.ModalBtns name="delete" onClick={goTrash}>
                        삭제하기
                    </M.ModalBtns>
                    <M.ModalBtns name="cancel" onClick={xDelete}>
                        취소하기
                    </M.ModalBtns>
                </M.ModalBtnBox>
            </M.TrashDeleteModal>
        </M.ModalWrapper>
    );
};
