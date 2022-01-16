import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Add, Container, Description, NoImg, Thumbnail } from "./GallerySelectorStyles"
import NoImage from '../../img/no-image.png'

interface IProps {
    isGallery: boolean,
    image?: string,
    header?: string,
    link?: string,
    h?: string,
    selectGallery?: (selector: string, title: string) => void,
    openSelection?: () => void
}


const GallerySelector: React.FC<IProps> = ({ image, header, link, isGallery, h, selectGallery, openSelection }) => {


    return (
        <Container>
            {
                isGallery ? (
                    <React.Fragment>
                        <Link to={`/gallery/${link}`} onClick={() => link && header && selectGallery && selectGallery(link, header)}>
                            <Thumbnail img={image && image}>
                                {
                                    !image && <NoImg src={NoImage} />
                                }
                            </Thumbnail> 
                        </Link>
                        <Description>{ header }</Description>
                    </React.Fragment>
                )
                :
                <Add onClick={openSelection} h={h}>
                    <img src={image} />
                    <p>Pridať kategóriu</p>
                </Add>
            }


        </Container>
    )
}


export default GallerySelector