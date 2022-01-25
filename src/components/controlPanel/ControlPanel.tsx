import { Btn } from "../UI/button/ButtonStyles"
import Loader from "../UI/loader/Loader"


interface IProps {
    upload: boolean,
    setUpload: () => void,
    setDeletePhotos: () => void,
    deletePhotos: boolean,
    filteredImgs: any,
    noImgs: boolean,
    handleDeleteGallery: () => void
}


const ControlPanel: React.FC<IProps> = ({ upload, setUpload, setDeletePhotos, deletePhotos, filteredImgs, noImgs, handleDeleteGallery}) => {
    return (
        <span style={{ position: 'relative', left: '7px'}}>
            <Btn style={{ marginBottom: '1rem' }} onClick={setUpload} bg="#000" color="#fff" disabled={false}>
            { !upload ? 'Zobraziť upload' : 'Skryť upload' }
            </Btn>
            <Btn style={{ marginLeft: '1rem' }} onClick={setDeletePhotos} bg="#b71616" color="#fff" disabled={filteredImgs.length > 0 ? false : true}>
                { deletePhotos ? 'Odznačiť' : 'Označiť na zmazanie'}        
            </Btn>

            <Btn style={{ marginLeft: '1rem' }} onClick={handleDeleteGallery} bg="#b71616" color="#fff" disabled={false}>Zmazať galériu</Btn>
            {
                filteredImgs.length === 0 && noImgs === false ? <span style={{ position: 'relative', top:'8px', left: '5px'}}><Loader /></span> : null
            }
        </span>
    )
}

export default ControlPanel