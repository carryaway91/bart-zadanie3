import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    position: relative;
    left: 7px;

    @media(max-width: 570px) {
        flex-direction: column;
        left: 0
    }
`

export const Btn = styled.button<{disabled: boolean}>`
    background: ${props => props.disabled ? '#ccc' : '#000'};
    border: none;
    color: #fff;
    padding: 1rem;
    border-radius: .4rem;
    cursor: pointer;
`

export const Zone = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    height: 140px;
    border: 1px dashed #444;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    background: #e6e2e2;
    margin: 1rem 0;

    @media(max-width: 300px) {
        width: 180px;

    }
`
export const PreviewList = styled.div`
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap
`

export const Preview = styled.img`
    width: 50px;
    height: 50px;
    margin: .5rem
`


export const Error = styled.p`
    color: red
`