import React from "react";
import { Link } from "react-router-dom";
import modify_normal from "../styles/images/modify_normal.png";
import Line from "../styles/images/Line45.png";
import delete_normal from "../styles/images/delete_normal.png";
import "../styles/List.css";

export default function List_answer({ dataAnswer, dataYear, showDelete }) {
  return (
    <div className="List">
      {dataAnswer.length > 0 ? (
        dataAnswer.map((an, index) => {
          return (
            <div className="list">
              <hr></hr>
              <div className="watch">
                <p>{dataYear[index]}년의 나:</p>
                <p>{an}</p>
              </div>
              <div className="buttons">
                <p>전체공개</p>
                <Link
                  to={{
                    pathname: "/write",
                    state: {
                      aa: { an },
                    },
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
  );
}
