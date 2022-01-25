import styled from "styled-components";


export const Outer = styled.div``
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 600px) {
        justify-content: center
    }


    .loader-wrapper {
        position: fixed;
        z-index: 2222222222222222222;
        top: calc(50% - 40px);
        left: calc(50% - 40px);

    }
`

