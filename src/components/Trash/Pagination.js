import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div id="navDiv">
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi
              key={number}
              className="page-item"
              onClick={() => paginate(number)}
            >
              <PageSpan className="page-link">{number}</PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: #777777;
  padding: 1px;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  margin: 0 4.5px;
  background: #e3e3e3;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background: #7eb496;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

export default Pagination;
