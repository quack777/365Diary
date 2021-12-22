import React from 'react';
import delete_normal from "../styles/images/delete_normal.png";
import restore_normal from "../styles/images/restore_normal.png";
import Line from "../styles/images/Line45.png";

const Posts = ({ posts }) => {
  return (
    <section>
    {posts.map((data, index) => {
          return (
            <div>
              <hr></hr>
              <div className="question">
                <p>
                  {data.answer_date && data.answer_date.substring(0, 2)}월{" "}
                  {data.answer_date && data.answer_date.substring(2, 4)}일
                </p>
                <p>{data.question_num}api호출</p> {/* 백에서 question데이터 담아주기로 함 => data.question */}
              </div>
              <div className="answers">
                <p>{data.answer_year}년의 나:</p>
                <p>{data.answer}</p>
              </div>
              <div className="btns">
                <img
                  // onClick={() => revert(data.answer_num, data.answer_delete, data.delete_date)}
                  alt="복원"
                  src={restore_normal}
                ></img>
                <img src={Line}></img>
                <img
                  // onClick={() => oneRemove(data.answer_num)}
                  alt="삭제"
                  src={delete_normal}
                ></img>
              </div>
            </div>
          );
        })}
  </section>
  );
};
export default Posts;