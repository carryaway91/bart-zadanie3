import styled from "styled-components";

export const Container = styled.span`
    display: inline-flex;
    background: #ddd;
    color: #666;
    justify-content: center;
    border-radius: 5rem;
    width: min-content;
    media(max-width: 450px) {
        width: 10rem
    }
    
    button {
        width: 4rem;
        background:  transparent;
        border: none;
        cursor: pointer;
        position: relative;
        top: 2px
    }
`


export const PageSelector = styled.span<{selected: boolean}>`
    cursor: pointer;
    padding: 1rem 1.5rem;
    font-weight: ${props => props.selected ? 'bold': 'normal'};
    color: ${props => props.selected ? '#000' : 'inherit'};
    background-color: ${props => props.selected ? '#999999' : 'none'};
    align-self: center;

    @media(max-width: 450px) {
        padding: .5rem 1rem
    }
`

export const Numbers = styled.div`
    width: 18rem;
    display: flex;
    justify-content: left;

    @media(max-width: 450px) {
        width: 13rem
    }
`


export const Fill = styled.div`
    width: 4rem
`