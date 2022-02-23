import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Posts from "./Posts";
import TrashAllDeleteModal from "./TrashAllDeleteModal";
import "../../styles/Trash.css";
import styled from "styled-components";

const Trash = () => {
    const [member, setMember] = useState(Number(sessionStorage.getItem("member_num")));
    const [trashAllData, setTrashAlldata] = useState([]);
    const [openTrashAllDeleteModal, setOpenTrashAllDeleteModal] = useState(false);
    const [gotrashdata, setGotrashdata] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const history = useHistory();

    useEffect(() => {
        const getTrashes = async () => {
            try {
                const getTrashses = await axios.get(`${process.env.REACT_APP_SERVER_IP}/trashes/${member}`);
                setTrashAlldata(getTrashses.data);
                setPosts(getTrashses.data);
            } catch (error) {
                console.log(error);
                history.push("/error");
            }
        };
        getTrashes();
    }, []);

    function allClear() {
        setOpenTrashAllDeleteModal(true);
    }

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    const revert = useCallback(
        (answer_num, answer_delete, delete_date, question_num) => {
            axios({
                url: `/trashes/settings/${answer_num}/${member}`,
                method: "patch",
                baseURL: process.env.REACT_APP_SERVER_IP,
                data: {
                    answer_delete: answer_delete,
                    delete_date: delete_date,
                    question_num: question_num,
                },
            })
                .then(function (response) {
                    console.log(response);
                    setPosts(posts.filter((data) => data.answer_num !== answer_num));
                })
                .catch(function (error) {
                    console.log(error);
                    history.push("/error");
                });
        },
        [history, member, posts],
    );

    return (
        <TrashLayout className="Trash">
            <TrashHeader>
                <div className="leftBox">
                    <TrashTitle>휴지통</TrashTitle>
                    <TrashContent>휴지통에 있는 일기는 7일이 지나면 완전히 삭제됩니다</TrashContent>
                </div>
                <TrashAllDeleteBtn onClick={allClear}>휴지통 비우기</TrashAllDeleteBtn>
            </TrashHeader>
            <Posts posts={currentPosts(posts)} setPosts={setPosts} revert={revert} member={member}></Posts>
            {posts.length > 5 ? (
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={setCurrentPage}
                ></Pagination>
            ) : null}

            <section>
                {openTrashAllDeleteModal ? (
                    <TrashAllDeleteModal
                        setOpenTrashAllDeleteModal={setOpenTrashAllDeleteModal}
                        trashAllData={trashAllData}
                        setTrashAlldata={setTrashAlldata}
                        gotrashdata={gotrashdata}
                        setGotrashdata={setGotrashdata}
                        posts={posts}
                        setPosts={setPosts}
                        history={history}
                    />
                ) : null}
            </section>
        </TrashLayout>
    );
};

const TrashLayout = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    width: 100%;
    margin: 0 auto;
    margin-top: 70px;
    @media ${({ theme }) => theme.device.mobile} {
        width: 375px;
    }
`;

const TrashHeader = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const TrashTitle = styled.p`
    margin: 0;
    color: #084861;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 41.25px;
    @media ${({ theme }) => theme.device.mobile} {
        font-size: 24px;
    }
`;

const TrashContent = styled.p`
    margin-top: 30px;
    margin-bottom: 61px;
    color: #98999c;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    @media ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const TrashAllDeleteBtn = styled.button`
    align-self: flex-start;
    // position: relative;
    // left: 70px;
    // width: 191px;
    // height: 55.5px;
    padding: 15px 40px;
    border-radius: 16px;
    color: #f9f8f9;
    background: #7eb496;

    font-size: 18.75px;
    font-weight: 500;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    line-height: 174.2%;
    cursor: pointer;
    @media ${({ theme }) => theme.device.mobile} {
        position: relative;
        bottom: 10px;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 12px;
    }
`;

export default Trash;
