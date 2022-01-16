import styled from "styled-components";

export const Container = styled.div<{show: boolean}>`
    position: absolute;
    top: 1rem;
    right: 0rem;
    background-color: #c3f4c3;
    border: 2px solid #87cd87;
    border-radius: 7px;
    color: #507450;
    font-weight: 500;
    padding: 1rem 2rem;
    opacity: ${props => props.show ? '1' : '0'};
    transition: all .5s ease-in-out;

    p {
        margin: 0
    }
`