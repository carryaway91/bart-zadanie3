import styled from "styled-components";


export const Outer = styled.div``
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 600px) {
        justify-content: center
    }
`

export const PhotoContainer = styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    margin: .5rem;
    cursor: pointer
`


export const Img = styled.img`
    width: 150%;
`

export const ImageContainer = styled.div<{showImage: boolean, onClick: () => void}>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0 2rem;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.showImage ? '1' : '0'};
    transition: opacity .4s ease-in-out;
    border-radius: 1rem;
    z-index: 1;
`   

export const Wrapper = styled.div<{onClick: (e:  React.MouseEvent<HTMLElement>) => void}>`
    position: relative;
    z-index: 111
`
    
    export const SelectedImage = styled.img`
    max-width: 100%;
    max-height: 80vh;
    border-radius: 1rem;
    z-index: 1111
`

