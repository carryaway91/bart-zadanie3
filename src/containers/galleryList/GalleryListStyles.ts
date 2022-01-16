import styled from "styled-components";

export const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh

`


export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;

    @media(max-width: 600px) {
        justify-content: center
    }
`

