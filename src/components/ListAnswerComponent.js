import React from "react";
import { Link } from "react-router-dom";
import modify_normal from "../styles/images/modify_normal.png";
import Line from "../styles/images/Line45.png";
import delete_normal from "../styles/images/delete_normal.png";
import "../styles/List.css";

export default function List_answer({ dataAnswer, dataYear, showDelete, answerAllData }) {
  return (
    <div className="List">
      {answerAllData.length > 0 ? (
        answerAllData.map((data, index) => {
          return (
            <div className="list">
              <hr></hr>
              <div className="watch">
                <p>{data.answer_year}년의 나:</p>
                <p>{data.answer}</p>
              </div>
              <div className="buttons">
                <p>전체공개</p>
                <Link
                  to={{
                    pathname: `/write/${data.question_num}`,
                    state: { data },
                  }}
                >
                  <div>
                    <img src={modify_normal}></img>
                  </div>
                </Link>
                <img src={Line}></img>
                <div onClick={() => showDelete(index)}>
                  <img src={delete_normal}></img>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>없어여</div>
      )}
    </div>
    // <div className="List">
    //   {dataAnswer.length > 0 ? (
    //     dataAnswer.map((answer, index) => {
    //       return (
    //         <div className="list">
    //           <hr></hr>
    //           <div className="watch">
    //             <p>{dataYear[index]}년의 나:</p>
    //             <p>{answer}</p>
    //           </div>
    //           <div className="buttons">
    //             <p>전체공개</p>
    //             <Link
    //               to={{
    //                 pathname: "/write",
    //                 state: { answer },
    //               }}
    //             >
    //               <div>
    //                 <img src={modify_normal}></img>
    //               </div>
    //             </Link>
    //             <img src={Line}></img>
    //             <div onClick={() => showDelete(index)}>
    //               <img src={delete_normal}></img>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <div>없어여</div>
    //   )}
    // </div>
  );
}
