import React, { useContext, useEffect, useState } from 'react'
import GallerySelector from '../../components/gallerySelector/GallerySelector'
import { Container, Page } from './GalleryListStyles'
import Add from '../../img/icons/add.png'
import { GalleryContext } from '../../context/galleryContext'
import Selection from '../../components/selection/Selection'
import { apiClient } from '../../apiClient/apiClient'
import axios from 'axios'
import PaginationBar from '../../components/paginationBar/PaginationBar'
import Loader from '../../components/UI/loader/Loader'

interface IProps {
    selectGallery: (selector: string, title: string) => void,
    setLoaded: (arr: IMGInterface) => void,
    loaded: [],
    reload: boolean,
    cancelReload: () => void
}

interface IMGInterface {path: string, image?: {path: string, fullpath: string, name: string, modified: string }, name: string, img: string }


const GalleryList: React.FC<IProps> = ({ selectGallery, setLoaded, loaded, reload, cancelReload }) => {

    const [imgs, setImgs] = useState<IMGInterface[]>([])
    const [showSelection, setShowSelection] = useState(false)
    const [galleryImgs, setGalleryImgs] = useState<any>([])
    const [paginatedArray, setPaginatedArray] = useState([])
    const [page, setPage] = useState<number|null>(null)
    const [paginatedPage, setPaginatedPage] = useState<IMGInterface[]>([])




    const { showOverlay, overlay } = useContext(GalleryContext)
    

    useEffect(() => {

      /* zavolaj api na /gallery len ked este nebola prvotne nacitana
        inak nacitaj z uloziska
      */
      if(loaded.length == 0) {
        setGalleries()
      } else {
        setPaginatedArray(loaded)
      }
    }, [loaded])

    // po zmazani galerie znovu nacitaj api
    useEffect(() => {
      if(reload) {
        setGalleries()
      }
    }, [reload])

    // nastav paginaciu
    useEffect(() => {
      if(page || page === 0) {
        localStorage.setItem('page', JSON.stringify(page))
      } 
    }, [page])

    useEffect(() => {
      if(!localStorage.getItem('page')) {
        localStorage.setItem('page', JSON.stringify(0))
      } else {
        const currentPage = parseInt(JSON.parse(localStorage.getItem('page') || '0') )
        setPage(currentPage)
      }
    }, [])

    // nastav napaginovanu stranku
    useEffect(() => {
        if(paginatedArray) {
            setPaginatedPage(paginatedArray[page === null ? 0 : page])
        } 
    },[page, paginatedArray])

    // zavri komponent ak zmizne overlay
    useEffect(() => {
        if(!overlay) {
            setShowSelection(false)
          }
      }, [overlay])

    
    useEffect(() => {
        if(galleryImgs.length > 0)
          addPicsToGalleries(imgs, galleryImgs)
      },[galleryImgs])

    // api na gallery endpoint a vyfiltrovanie responsu
    const setGalleries = async() => {
      const res = await apiClient('/gallery')
      let galleries = res.data.galleries
      const imgsPaths = galleries.filter((p: { image: {}}) => p.image) 
      filterImgs(imgsPaths)
      setImgs(res.data.galleries) 
  } 
    
      // ukaz komponent s formularom na novu galeriu
      const handleShowSelection = () => {
          setShowSelection(true)
          showOverlay()
      }

  // vyfiltruj galerie s image property
  const filterImgs = async(paths: []) => {
      const unfiltered = await Promise.allSettled(
        paths.map(async(p: { image: { fullpath: string }}) => {
          const path = p.image.fullpath 
            const image = await Promise.allSettled([
              await axios({
                method: 'get',
                url: `http://api.programator.sk/images/0x0/${path}`,
                responseType: 'blob'
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
        setGalleryImgs(filtered)

        if(reload) { cancelReload() }
  }



  // prirad img property do vyfiltrovaneho pola
  const addPicsToGalleries = (arrOfPics: IMGInterface[], filteredPics: { value: { path: string, image: {} }}[]) => {
    const newArray: any = []


      for(let i = 0; i < arrOfPics.length - 1; i++) {
        for(let n = 0; n < filteredPics.length - 1; n++) {
          if(arrOfPics[i].image && arrOfPics[i].image?.fullpath === filteredPics[n].value.path) {
            newArray.push({
              ...arrOfPics[i],
              img: filteredPics[n].value.image
            })
          } 
          if(!arrOfPics[i].image) {
            newArray.push(arrOfPics[i])
          }
        }
      }

      const filteredArray = filterArray(newArray)
      paginate(filteredArray)
    }

    // urob paginaciu
    const paginate = (arr: IMGInterface[]) => {
        let paginated: any = []

      for(let i = 0; i < arr.length; i) {
          if(arr.length >= 5) {
              paginated.push(arr.splice(i, 5))
            } else {
                paginated.push(arr.splice(i, arr.length))
            }
        } 
        setLoaded(paginated)
        setPaginatedArray(paginated)
    }

  // vyfiltruj duplikaty z pola
  const filterArray = (arr: IMGInterface[]) => {
    let filteredArr = arr.reduce((acc: any[], current: { name: string }) => {
      const x = acc.find((item: { name: string}) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }

    }, [])


    // zorad podla toho ci ma galeria img a podla prop modified
    filteredArr.forEach((i: IMGInterface) => {
      if(i.image) {
        const galleryWithImage = i
        const index = filteredArr.findIndex((el: { path: string}) => el.path === i.path)
        const item = filteredArr.splice(index, 1)
        filteredArr.unshift(item[0])
      }
    })

    filteredArr.sort((a: { image: { modified: string}} ,b: { image: { modified: string}} ) => {
      if(a.image && b.image) {
        return new Date(b.image.modified).valueOf() - new Date(a.image.modified).valueOf() 
      } else {
        return 0
      }
    })
    return filteredArr
  }
  
    return (
        <Page>
            {
                paginatedPage ? (
                    <React.Fragment>
                        <PaginationBar perPage={5} page={page === null ? 0 : page} setPage={(n) => setPage(n)} paginatedArray={paginatedArray}/>

                        <Container>
                            {
                                page === 0 &&  <GallerySelector 
                                isGallery={false}
                                image={Add}
                                openSelection={handleShowSelection}
                                h="246px"
                            />
                            }
                            {
                                paginatedPage && paginatedPage.map((i: {path: string, image?: {path: string, fullpath: string, name: string, modified: string }, name: string, img: string}, idx: number ) => 
                                
                                (
                                    <GallerySelector 
                                    isGallery={true}
                                    key={idx} 
                                    image={i.img} 
                                    header={i.name} 
                                    link={i.path} 
                                    h="246px"
                                    selectGallery={(selector: string, title: string) => selectGallery(selector, title)} />)
                                )
                            }
                            {
                                showSelection && <Selection close={() => setShowSelection(false)} />
                            }
                        </Container>
                    </React.Fragment>
                ) 
                :
                <Loader />
            }
        </Page>
    )
}

export default GalleryList