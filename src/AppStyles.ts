import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    position: relative;
    min-height: 100vh;
    margin: 0 auto;
    padding: 3rem 0;

    .relative {
        position: relative;
        left: .4rem;

        @media(max-width: 600px) {
            left: 0
        }
    }

    @media(max-width: 600px) {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        align-items: center
    }

    .header-loader-container {
        display: flex
    }
`

export const Header = styled.h2`
    font-size: 36px;
    margin-top: 0;
    margin-right: 1rem
`

export const Categories = styled.h3`
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 1.5rem;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .7)
`

export const BackArrow = styled.img`
    width: 14px;
    margin-right: 0.5rem;
`