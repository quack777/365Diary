import styled from "styled-components";

export const AlertWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
`;

export const AlertBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 543px;
    height: 83px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    z-index: 50;
    &:nth-child(3) {
        cursor: pointer;
    }
`;

export const AlertContent = styled.span`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 22.5px;
    line-height: 28px;
    color: #084861;
`;
