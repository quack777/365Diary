import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, currentPage, changeCurrentPage }) => {
    const [pageNumbers, setPageNumbers] = useState();

    const pageNumberCalculator = useCallback(() => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }, [postsPerPage, totalPosts]);

    useEffect(() => {
        setPageNumbers(pageNumberCalculator);
    }, [pageNumberCalculator]);

    return (
        <PageNav>
            <PageUl>
                {pageNumbers?.map((number) => (
                    <PageLi
                        key={number}
                        active={number === currentPage && true}
                        onClick={() => changeCurrentPage(number)}
                    >
                        <PageSpan>{number}</PageSpan>
                    </PageLi>
                ))}
            </PageUl>
        </PageNav>
    );
};

const PageNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
    width: 25px;
    margin: 0 4.5px;
    padding: 5px;
    border-radius: 5px;
    background: ${(props) => (props.active ? "#7eb496" : "#e3e3e3")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#777777")};
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
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
