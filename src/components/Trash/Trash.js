import React, { useEffect, useState } from "react";
import "../../styles/Trash.css";
import axios from "axios";
import Pagination from "./Pagination";
import Posts from "./Posts";
import { useHistory } from "react-router-dom";
import TrashAllDeleteModal from "./TrashAllDeleteModal";

function Trash() {
  const [member, setMember] = useState(
    Number(sessionStorage.getItem("member_num"))
  );
  const [trashAllData, setTrashAlldata] = useState([]);
  const [openTrashAllDeleteModal, setOpenTrashAllDeleteModal] = useState(false);
  const [clickAN, setClickAN] = useState();
  const [gotrashdata, setGotrashdata] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const history = useHistory();

  useEffect(() => {
    const getTrashes = async () => {
      try {
        const getTrashses = await axios.get(
          `${process.env.REACT_APP_SERVER_IP}/trashes/${member}`
        );
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

  return (
    <div className="Trash">
      <div>
        <p>휴지통</p>
        <p onClick={allClear}>휴지통 비우기</p>
      </div>
      <p>휴지통에 있는 일기는 7일이 지나면 완전히 삭제됩니다</p>
      <Posts
        posts={currentPosts(posts)}
        setPosts={setPosts}
        member={member}
        setClickAN={setClickAN}
      ></Posts>
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
}

export default Trash;
