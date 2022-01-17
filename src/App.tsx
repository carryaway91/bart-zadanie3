import './App.css';
import GalleryList from './containers/galleryList/GalleryList'
import { BackArrow, Categories, Container, Header, Overlay } from './AppStyles';
import { Link, Route, Switch } from 'react-router-dom';
import Gallery from './containers/gallery/Gallery';
import { api } from './api'
import { useEffect, useState } from 'react';
import { GalleryContext } from './context/galleryContext'
import Back from './img/icons/left.png'
import { NotificationContext } from './context/notificationContext';
import Notification from './components/notification/Notification';
import Loader from './components/UI/loader/Loader';

function App() {

  const [selectedGallery, setSelecteGallery] = useState()
  const [overlay, setOverlay] = useState(false)
  const [header, setHeader] = useState<string>('')
  const [notification, setNotification] = useState<string>('')
  const [loadedGalleries, setLoadedGalleries] = useState<any>([])
  const [reload, setReload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(notification !== '') {
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
  }, [notification])



  const handleSelectGallery = (sel: string, title: string) => {
    setSelecteGallery(api.galleries[sel])
  }



  const handleGoBack = () => {
    setHeader('')
  }
  
  
  const handleReload = () => {
    setReload(true)
    setLoading(true)
    setHeader('')
  }

  return (
    <div className="App" style={{ position: 'relative'}}>

      <Container>
        <Header className='relative'>Fotogaléria</Header>
        { loading && <Loader />}
        <Categories className='relative'>{ header != '' ?  <Link to="/" style={{ textDecoration: 'none', color:'#000'}} onClick={handleGoBack}>
        <BackArrow src={Back} /> { header }</Link>  : 'Kategórie' }</Categories>

        { notification !== '' && <Notification message={notification} /> }

        <NotificationContext.Provider value={{
          setNotMessage: (message: string) => setNotification(message) 
        }} >
          <GalleryContext.Provider value={{
            showOverlay: () => setOverlay(true),
            closeOverlay: () => setOverlay(false),
            overlay: overlay
          }}>
            <Switch>
              <Route path="/" exact render={() => <GalleryList cancelReload={() => setLoading(false)} reload={reload} setLoaded={(arr: any) => setLoadedGalleries(arr)} loaded={loadedGalleries} selectGallery={(selector: string, title: string) => handleSelectGallery(selector, title)} />} />
              <Route path="/gallery/:slug" exact render={() => <Gallery setReload={handleReload} setHeader={(name: string) => setHeader(name)}  />} />
              <Route path="/404" exact render={() => <h1>Stranka sa nenasla</h1>} />
            </Switch>
          </GalleryContext.Provider>
        </NotificationContext.Provider>
      </Container>
        { overlay && <Overlay className="overlay" onClick={() => setOverlay(false)} />}
    </div>
  );
}

export default App;
