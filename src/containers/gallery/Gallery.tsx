import React, { useEffect, useState, useContext, useCallback } from "react"
import { Redirect, useParams } from "react-router-dom"
import { Container, Outer,  } from "./GalleryStyles"
import { GalleryContext } from '../../context/galleryContext'
import { apiClient, apiPics } from "../../apiClient/apiClient"
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop"
import { NotificationContext } from "../../context/notificationContext"
import ControlPanel from "../../components/controlPanel/ControlPanel"
import DisplayedImg from "../../components/displayedImg/DisplayedImg"
import ImageLoader from "../../components/UI/imageLoader/ImageLoader"
import { getImagesFromApi } from '../../util/gallery/GalleryUtil'
import GalleryImage from "../../components/galleryImage/GalleryImage"

interface IParams {
    slug: string,
}

interface IProps {
    setHeader: (slug: string) => void,
    setReload: () => void
}


const Gallery: React.FC<IProps> = ({ setHeader, setReload }) => {
    const [imgs, setImgs] = useState<any>(null)
    const [displayedImg, setDisplayedImg] = useState<string>('')
    const [imgIdx, setImgIdx] = useState<number>(0)
    const [picActive, setPicActive] = useState<boolean>(false)
    const [noImgs, setNoImgs] = useState<boolean>(false)
    const [filteredImgs, setFilteredImgs] = useState<any>([])
    const [redNotFound, setRedNotFound] = useState<boolean>(false)
    const [redBack, setRedBack] = useState<boolean>(false)
    const [upload, setUpload] = useState<boolean>(false)
    const [galleryName, setGalleryName] = useState<string>('')
    const [deletePhotos, setDeletePhotos] = useState<boolean>(false)
    const [imageLoading, setImageLoading] = useState<boolean>(false)


    const {showOverlay, closeOverlay } = useContext(GalleryContext)
    const { setNotMessage } = useContext(NotificationContext)
    
    
    const { slug } = useParams<IParams>()
    
    const getGalleryPics = useCallback(async() => {
            try {
                const res: any = await apiClient.get(`/gallery/${slug}`)
                setImgs(res.data.images)
                setHeader(res.data.gallery.name)
                setGalleryName(res.data.gallery.name)
            } catch(err: any) {
                if(err.response.status === 404) {
                    setRedNotFound(true)
                }
            }
    }, [])  

    useEffect(() => {
        getGalleryPics()
    }, [getGalleryPics])

  
    useEffect(() => {
        const filterImgs = async(paths: []) => {
            if(paths.length === 0) { setNoImgs(true) }
            const unfiltered = await getImagesFromApi(paths)
            const filtered = unfiltered.filter(p => p.status !== 'rejected')
            
            // zorad podla casu vytvorenia
            imgs.sort((a: { modified: string},b: { modified: string}) => {
                        return new Date(b.modified).valueOf() - new Date(a.modified).valueOf()
                    })
                    
                    imgs.map((img: { fullpath: string, name: string, path: string}) => {
                        return filtered.forEach((fil: any) => {
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
                    
                    if(imgs) {
            const paths = imgs.map((i: { fullpath: string }) => i.fullpath)
            try {
                filterImgs(paths)
            } catch(err) {
                console.log('err')
            }
        }
    }, [imgs])

    
    
    

    
    
    
    // ukaz kliknuty obrazok
    const handleShowPic = async(i:{src:string, path: string, name: string}) => {
        showOverlay()
        
        setImageLoading(true)
        setDisplayedImg('')
        const pic = await apiPics.get(`/images/0x0/${galleryName}/${i.path}`)
        setImageLoading(false)
        setDisplayedImg(URL.createObjectURL(pic.data))
        const idx = filteredImgs.findIndex((el: {src: string ,path: string}) => el.src === i.src)
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
            if(!imageLoading) {
                setImgIdx(prev => prev + 1)
                handleShowPic(filteredImgs[imgIdx + 1])
            } else { console.log('nie')}
        } else {
            if(!imageLoading) {
                setImgIdx(0)
                handleShowPic(filteredImgs[0])
            }
        }
    }
    
    
    // predosly obrazok
    const handlePrevPic = () => {
        if(imgIdx !== undefined && imgIdx > 0) {
            if(!imageLoading) {
                setImgIdx(prev => prev && prev - 1)
                handleShowPic(filteredImgs[imgIdx - 1])
            }
        } else {
            if(!imageLoading) {
                setImgIdx(filteredImgs.length - 1)
                handleShowPic(filteredImgs[filteredImgs.length - 1])
            }
        }
    }


    useEffect(() => {
        const handlePressNext = (e: any) => {
            if(e.key === 'ArrowRight') {
                handleNextPic()
            } else if(e.key === 'ArrowLeft') {
                handlePrevPic()
            }
        }

        window.addEventListener('keydown', handlePressNext)
        return () => {
            window.removeEventListener('keydown', handlePressNext)
        }
    }, [handleNextPic])

    const handleClose = () => {
        closeOverlay()
        setDisplayedImg('')
    }

    // zmaz galeriu
    const handleDeleteGallery = async() => {
        const confirmation: boolean = window.confirm(`Naozaj chcete zmazať galériu ${slug}?`)
        if(confirmation) {
            const res = await apiClient.delete(`/gallery/${slug}`)
            if(res.status === 200) {
                setNotMessage('Galéria bola úspešne zmazaná!') 
                setRedBack(true)
                setReload()
            }
        }
    }

    // zmaz fotku
    const handleDeletePic = async(i: any, idx: number) => {
        const confirmation: boolean = window.confirm('Naoza chcete zmazať tento obrázok?')

        if(confirmation) {
            const res = await apiClient.delete(`/gallery/${slug}/${i.path}`)
            if(res.status === 200) {
                filteredImgs.splice(idx, 1)
                if(filteredImgs.length === 0) {
                    setNoImgs(true)
                }
                setNotMessage('Obrázok bol úspešne zmazaný!')
            }
       }
    }


    return (
        <Outer>

            <ControlPanel upload={upload} setUpload={() => setUpload(!upload)} 
                setDeletePhotos={() => setDeletePhotos(!deletePhotos)} deletePhotos={deletePhotos}
                filteredImgs={filteredImgs} noImgs={noImgs} handleDeleteGallery={handleDeleteGallery}
            />

            { upload && <DragAndDrop setReload={(pic) => setFilteredImgs((prev: any) => [pic, ...prev])} slug={slug} /> }
            
            <Container>
                { redNotFound && <Redirect to="/404" /> }
                { redBack && <Redirect to="/" /> }
                {
                    filteredImgs.length === 0 && noImgs === true ? <p>V tejto galérií nie sú žiadne obrázky</p> : null 
                }
                
                {
                    filteredImgs && filteredImgs.map((i: any, idx: number) => (
                        <GalleryImage i={i} idx={idx} 
                                        key={idx}
                                        handleDeletePic={(i: any, idx: number) => handleDeletePic(i, idx)}
                                        deletePhotos={deletePhotos}
                                        handleShowPic={(i: any) => handleShowPic(i)}
                        />
                        )   
                        )
                    }
                    {
                        imageLoading && <span className="loader-wrapper"><ImageLoader /></span>
                    }
                    { displayedImg &&   <DisplayedImg handleClose={handleClose}
                                                    handleClosePic={handleClosePic} 
                                                    picActive={picActive} 
                                                    filteredImgs={filteredImgs} 
                                                    displayedImg={displayedImg} 
                                                    handleNextPic={handleNextPic}
                                                    handlePrevPic={handlePrevPic}
                                                    idx={imgIdx}
                                        />
                                    }
        </Container>
    </Outer>
    )
}

export default Gallery