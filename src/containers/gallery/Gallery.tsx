import React, { useEffect, useState, useContext } from "react"
import { Redirect, useParams } from "react-router-dom"
import { Container, ImageContainer, Img, Outer, PhotoContainer, SelectedImage, Wrapper } from "./GalleryStyles"
import { GalleryContext } from '../../context/galleryContext'
import PicSelector from '../../components/UI/picSelector/PicSelector'
import Next from '../../img/icons/right.png'
import Prev from '../../img/icons/left.png'
import { apiClient } from "../../apiClient/apiClient"
import axios from "axios"
import Loader from "../../components/UI/loader/Loader"
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop"
import { Btn } from "../../components/UI/button/ButtonStyles"
import { NotificationContext } from "../../context/notificationContext"


interface IParams {
    slug: string,
}

interface IProps {
    setHeader: (slug: string) => void,
    setReload: () => void
}


const Gallery: React.FC<IProps> = ({ setHeader, setReload }) => {
    const [imgs, setImgs] = useState<any>(null)
    const [displayedImg, setDisplayedImg] = useState('')
    const [imgIdx, setImgIdx] = useState<number>(0)
    const [picActive, setPicActive] = useState<boolean>(false)
    const [noImgs, setNoImgs] = useState<boolean>(false)
    const [filteredImgs, setFilteredImgs] = useState<any>([])
    const [redNotFound, setRedNotFound] = useState<boolean>(false)
    const [redBack, setRedBack] = useState<boolean>(false)
    const [upload, setUpload] = useState(false)

    const {showOverlay, closeOverlay } = useContext(GalleryContext)
    const { setNotMessage } = useContext(NotificationContext)


    const { slug } = useParams<IParams>()

    useEffect(() => {
        getGalleryPics()
    }, [])


    useEffect(() => {
        if(imgs) {
            const paths = imgs.map((i: { fullpath: string }) => i.fullpath)
            try {
                filterImgs(paths)
            } catch(err) {
                console.log('err')
            }
        }
    }, [imgs])


    const filterImgs = async(paths: []) => {
        if(paths.length == 0) { setNoImgs(true) }
            let image: any
                const unfiltered = await Promise.allSettled(
                    paths.map(async(path: string) => {
                            image = await Promise.allSettled([
                                await axios({
                                    method: 'get',
                                    url: `http://api.programator.sk/images/0x0/${path}`,
                                    responseType: 'blob',
                                })
                                
                            ])
                        if(image[0].status === 'fulfilled') {
                            return {
                                path: path,
                                image: URL.createObjectURL(image[0].value.data)
                            }
                        } 
                    })
                    )
                    
                    const filtered = unfiltered.filter(p => p.status !== 'rejected')
                    

                      // zorad podla casu vytvorenia
                    imgs.sort((a: { modified: string},b: { modified: string}) => {
                        return new Date(b.modified).valueOf() - new Date(a.modified).valueOf()
                    })


                    
                    imgs.map((img: { fullpath: string, name: string, path: string}) => {
                        return filtered.map((fil: any) => {
                            if(img.fullpath === fil.value.path) {
                                setFilteredImgs((prev: any) => prev.concat(
                                    {
                                        name: img.name,
                                        path: img.path,
                                        src: fil.value.image
                                    }
                                    ))
                                }
                            })
                        })

    }


    const getGalleryPics = async() => {
        try {
            const res = await apiClient(`/gallery/${slug}`)
            setImgs(res.data.images)
            setHeader(res.data.gallery.name)
        } catch(err: any) {
            if(err.response.status === 404) {
                setRedNotFound(true)
            }
        }
    }

    // ukaz kliknuty obrazok
    const handleShowPic = (i:{src:string, path: string, name: string}) => {
        showOverlay()
        setDisplayedImg(i.src)
        const idx = filteredImgs.findIndex((el: {path: string}) => el.path === i.path)
        setImgIdx(idx)
        setPicActive(true)
    }

    // zatvor selectnuty obrazok
    const handleClosePic = () => {
        closeOverlay()
        setDisplayedImg('')
        setPicActive(false)
    }   

    // dalsi obrazok
    const handleNextPic = () => {
        if(imgIdx !== undefined && imgIdx < filteredImgs.length - 1) {
            setImgIdx(prev => prev + 1)
            setDisplayedImg(filteredImgs[imgIdx + 1].src)
        } else {
            setImgIdx(0)
            setDisplayedImg(filteredImgs[0].src)
        }
    }

    // predosli obrazok
    const handlePrevPic = () => {
        if(imgIdx !== undefined && imgIdx > 0) {
            setImgIdx(prev => prev && prev - 1)
            setDisplayedImg(filteredImgs[imgIdx - 1].src)
        } else {
            setImgIdx(filteredImgs.length - 1)
            setDisplayedImg(filteredImgs[filteredImgs.length - 1].src)
        }
    }

    const handleClose = () => {
        closeOverlay()
        setDisplayedImg('')
    }

    // zmaz galeriu
    const handleDeleteGallery = async() => {
        const confirmation: boolean = window.confirm(`Naozaj chcete zmazať galériu ${slug}?`)
        if(confirmation) {
            const res = await axios.delete(`http://api.programator.sk/gallery/${slug}`)
            if(res.status === 200) {
                setNotMessage('Galéria bola úspešne zmazaná!') 
                setRedBack(true)
                setReload()
            }
        }
    }

    return (
        <Outer>
            <span style={{ position: 'relative', left: '7px'}}>
                <Btn style={{ marginBottom: '1rem' }} onClick={() => setUpload(!upload)} bg="#000" color="#fff" disabled={false}>
                { !upload ? 'Zobraziť upload' : 'Skryť upload' }
                </Btn>
                <Btn style={{ marginLeft: '1rem' }} onClick={handleDeleteGallery} bg="#b71616" color="#fff" disabled={false}>Zmazať galériu</Btn>
            </span>
        { upload && <DragAndDrop setReload={(pic) => setFilteredImgs((prev: any) => [pic, ...prev])} slug={slug} /> }
            
        <Container>
                { redNotFound && <Redirect to="/404" /> }
                { redBack && <Redirect to="/" /> }
                {
                    filteredImgs.length === 0 && noImgs === false ? <Loader /> : noImgs === true && filteredImgs.length === 0 ? <p>V tejto galérií nie sú žiadne obrázky</p> : null 
                }
                
                {
                    filteredImgs && filteredImgs.map((i: any, idx: number) => (
                        <PhotoContainer key={idx}>
                            <Img src={i.src} alt={i.name} key={idx} onClick={() => handleShowPic(i)}/> 
                        </PhotoContainer>
                        )   
                        )
                    }
                {
                    displayedImg && (
                        <ImageContainer onClick={handleClose} showImage={picActive}>
                        <Wrapper onClick={(e:  React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                            <PicSelector top="1rem" right={1} bg="rgba(0, 0, 0, .6)" onClick={() => handleClosePic()}>
                                <svg fill="#fff" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                            </PicSelector>

                            {
                                filteredImgs.length > 1 && (
                                    <React.Fragment>
                                        <PicSelector top='calc(50% - 1.5rem)' right={-1.5} bg="white" onClick={handleNextPic}>
                                            <img src={Next} width="17px" />
                                        </PicSelector>
                                        <PicSelector top='calc(50% - 1.5rem)' left={-1.5} bg="white" onClick={handlePrevPic}>
                                            <img src={Prev} width="17px" />
                                        </PicSelector>
                                    </React.Fragment>
                                )
                            }

                        <SelectedImage src={displayedImg} />
                        </Wrapper>
                    </ImageContainer>
                )}
        </Container>
    </Outer>
    )
}

export default Gallery