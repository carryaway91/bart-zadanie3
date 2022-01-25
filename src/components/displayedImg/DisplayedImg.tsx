import React, { useEffect } from "react"
import PicSelector from "../UI/picSelector/PicSelector"
import { ImageContainer, SelectedImage, Wrapper } from "./DisplayedImgStyles"
import Next from '../../img/icons/right.png'
import Prev from '../../img/icons/left.png'

interface IProps {
    handleClose: () => void,
    handleClosePic: () => void,
    picActive: boolean,
    filteredImgs: any,
    displayedImg: string,
    handleNextPic: () => void,
    handlePrevPic: () => void,
    idx: number,
}


const DisplayedImg: React.FC<IProps> = ({ handleClose, handleClosePic, picActive, filteredImgs, displayedImg, handleNextPic, handlePrevPic, idx}) => {
    
    useEffect(() => {
        const closeImgListener = (e: any) => {
            if(e.keyCode === 27) {
                handleClose()
            }
        }
        window.addEventListener('keydown', closeImgListener)
        return () => {
            window.removeEventListener('keydown', closeImgListener)
        }
    }, [handleClose])
  




    return (
        <React.Fragment>
            <ImageContainer onClick={handleClose} showImage={picActive}>
                        <Wrapper onClick={(e:  React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                            <PicSelector top="1rem" right={1} bg="rgba(0, 0, 0, .6)" onClick={() => handleClosePic()}>
                                <svg fill="#fff" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                            </PicSelector>
                            {
                                filteredImgs.length > 1 && (
                                    <React.Fragment>
                                        <PicSelector top='calc(50% - 1.5rem)' right={-1.5} bg="white" onClick={handleNextPic} >
                                            <img src={Next} width="17px" alt="next-arrow" />
                                        </PicSelector>
                                        <PicSelector top='calc(50% - 1.5rem)' left={-1.5} bg="white" onClick={handlePrevPic}>
                                            <img src={Prev} width="17px" alt="previous-arrow" />
                                        </PicSelector>
                                    </React.Fragment>
                                )
                            }

                        <SelectedImage src={displayedImg} />
                        </Wrapper>
                    </ImageContainer>
        </React.Fragment>
    )
}

export default DisplayedImg