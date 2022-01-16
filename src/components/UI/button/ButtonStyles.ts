import styled from "styled-components";

export const Btn = styled.button<{bg: string, color: string, disabled: boolean}>`
    background: ${props => props.disabled ? '#ddd' : props.bg};
    padding: 1rem;
    color: ${props => props.color};
    border-radius: .3rem;
    border: none;
    cursor: pointer;
`