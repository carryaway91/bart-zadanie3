import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    width: 30vw;
    flex-direction: column;
    position: absolute;
    left: calc(50% - 15vw);
    top: 30vh;
    padding: 2.5rem;
    border-radius: .7rem;
    background: #fff;
    z-index: 1111111;

    h3 {
        margin: 0 0 1rem 0
    }

    @media(max-width: 1200px) {
        width: 50vw;
        left: calc(50% - 25vw);

    }

    @media(max-width: 550px) {
        width: 80%;
        left: 1%
    }

    @media(max-width: 400px) {
        width: 60%;
        left: 12%;
        padding: 2rem;
    }
    @media(max-width: 320px) {
        width: 60%;
        left: 7%
    }
    `

export const InnerWrap = styled.div`
    display: flex;
    position: relative;
`

export const SVG = styled.svg`
    position: absolute;
    right: 0;
    width: 1rem;
    cursor: pointer;

`

export const Form = styled.form<{onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }>`
    display: flex;
    flex-direction: column
`

export const Input = styled.input<{ autoFocus?: boolean}>`
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1.5rem;
`

export const InputName = styled.span`
    display: inline;
    position: relative;
    background: #fff;
    padding: 0 .7rem;
    font-size: .8rem;
    top: .4rem;
    left: .6rem;
    align-self: self-start;
`
export const ErrorMsg = styled.p`
    color: red;
    margin-top: 0
`
