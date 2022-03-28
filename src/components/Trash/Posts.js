import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TrashOneDeleteModal from "./TrashOneDeleteModal";
import delete_normal from "../../styles/images/delete_normal.png";
import restore_normal from "../../styles/images/restore_normal.png";
import Line from "../../styles/images/Line45.png";

const Posts = ({ revert, setPosts, posts, member }) => {
    const history = useHistory();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [clickAN, setClickAN] = useState();

    const oneRemove = (answer_num, answer_delete) => {
        setOpenDeleteModal(true);
        setClickAN([answer_num, answer_delete]);
    };

    return (
        <TrashAnswerLayout>
            {posts.map((data) => {
                return (
                    <TrashOneDataBox key={data.answer_num}>
                        <TrashDivisionLine></TrashDivisionLine>
                        <TrashQuestionBox>
                            <TrashQuestionDate>
                                {data.answer_date && data.answer_date.substring(0, 2)}월{" "}
                                {data.answer_date && data.answer_date.substring(2, 4)}일
                            </TrashQuestionDate>
                            <TrashQuestionContents>{data.question}</TrashQuestionContents>
                        </TrashQuestionBox>
                        <TrashAnswerBox>
                            <TrashAnswerYear>{data.answer_year}년의 나:</TrashAnswerYear>
                            <TrashAnswerContents>{data.answer}</TrashAnswerContents>
                        </TrashAnswerBox>
                        <TrashBtnsBox>
                            <TrashBtn
                                alt="revertBtn"
                                onClick={() =>
                                    revert(data.answer_num, data.answer_delete, data.delete_date, data.question_num)
                                }
                                src={restore_normal}
                            ></TrashBtn>
                            <TrashBtn alt="line" src={Line}></TrashBtn>
                            <TrashBtn
                                alt="deleteBtn"
                                onClick={() => oneRemove(data.answer_num, data.answer_delete)}
                                src={delete_normal}
                            ></TrashBtn>
                        </TrashBtnsBox>
                    </TrashOneDataBox>
                );
            })}
            {openDeleteModal ? (
                <TrashOneDeleteModal
                    clickAN={clickAN}
                    member={member}
                    posts={posts}
                    setPosts={setPosts}
                    setOpenDeleteModal={setOpenDeleteModal}
                    history={history}
                />
            ) : null}
        </TrashAnswerLayout>
    );
};

const TrashAnswerLayout = styled.section`
    width: 100%;
    max-width: 1014px;
`;

const TrashOneDataBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TrashDivisionLine = styled.hr`
    width: 100%;
    border: 1px solid #084861;
    opacity: 0.1;
`;

const TrashQuestionBox = styled.div`
    margin-bottom: 40px;
    @media ${({ theme }) => theme.device.mobile} {
        margin-bottom: 25px;
    }
`;

const TrashQuestionDate = styled.p`
    color: #f88270;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
`;

const TrashQuestionContents = styled.p`
    margin: 0;
    color: #084861;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 22.5px;
    line-height: 28px;
`;

const TrashAnswerBox = styled.div`
    align-self: flex-end;
    width: 100%;
    max-width: 759px;
`;

const TrashAnswerYear = styled.p`
    color: #084861;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 22.5px;
`;

const TrashAnswerContents = styled.p`
    color: #084861;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 18.75px;
    line-height: 209.7%;
    letter-spacing: -0.05em;
    word-wrap: break-word;
`;

const TrashBtnsBox = styled.div`
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 170px;
    height: auto;
`;

const TrashBtn = styled.img`
    padding: 5px 15px;
    cursor: pointer;
`;

export default Posts;
