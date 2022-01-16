import styled from "styled-components";


interface IProps extends React.HTMLAttributes<HTMLElement> {
    top: string,
    right?: number,
    left?: number,
    bg: string,
    onClick: () => void

}
export const Container = styled.div<IProps>`
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right && props.right }rem;
    left: ${props => props.left && props.left }rem;
    width: 3rem;
    height: 3rem;
    background: ${props => props.bg};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media(max-width: 550px) {
        width: 2rem;
        height: 2rem;
        left
    }
  
    @media(max-width: 400px) {
        width: 1.5rem;
        height: 1.5rem;
        left
    }
`