import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Posts from "./Posts";
import TrashAllDeleteModal from "./TrashAllDeleteModal";
import "../../styles/Trash.css";

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
        <div className="Trash">
            <div>
                <p>휴지통</p>
                <p onClick={allClear}>휴지통 비우기</p>
            </div>
            <p>휴지통에 있는 일기는 7일이 지나면 완전히 삭제됩니다</p>
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
        </div>
    );
};

export default Trash;
