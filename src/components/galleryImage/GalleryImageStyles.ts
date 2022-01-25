import styled from "styled-components";

export const PhotoContainer = styled.div`
    width: 200px;
    height: auto;
    overflow: hidden;
    margin: .5rem;
    cursor: pointer;
    position: relative
`
export const Img = styled.img`
    width: 100%;
    height: 100%
`


export const DeletePicOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4)
`
