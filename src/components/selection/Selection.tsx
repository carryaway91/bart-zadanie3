import React, { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { apiClient } from "../../apiClient/apiClient"
import { GalleryContext } from "../../context/galleryContext"
import { NotificationContext } from "../../context/notificationContext"
import Button from "../UI/button/Button"
import { Container, ErrorMsg, Form, InnerWrap, Input, InputName, SVG } from "./SelectionStyles"

interface IProps{
    close: () => void,
}

const Selection: React.FC<IProps> = ({ close }) => {

    // context
    const { closeOverlay } = useContext(GalleryContext)
    const { setNotMessage } = useContext(NotificationContext)

    //state 
    const [inputName, setInputName] = useState('')
    const [error, setError] = useState('')
    const [redirectTo, setRedirectTo] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleClose = () => {
        close()
        closeOverlay()
    }

    useEffect(() => {
        if(redirectTo !== '') {
            setRedirect(true)
        }
    }, [redirectTo])

    const handleSubmitForm = async() => {
        try {
            const res = await apiClient.post('/gallery', { 
                name: inputName
            })
            if(res.status === 201) {
                setRedirectTo(res.data.path)
                closeOverlay()
                setNotMessage('Galéria bola úspešne vytvorená!')
            }
        } catch (err: any) {
            switch(err.response.data.code) {
                case 409:
                    setError('Galéria s týmto názvom už existuje!')
                    break
                default:
                    setError('Vyskytla sa chyba so serverom!')
                    break
            }
        }
    }


    return (
        <Container>
            { redirect && <Redirect to={`/gallery/${redirectTo}`} />}
            <InnerWrap>
                <h3>Pridať kategóriu</h3>
                <SVG onClick={handleClose} fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></SVG>
            </InnerWrap>
            <InputName>Názov kategórie *</InputName>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                <Input autoFocus type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => setInputName(e.currentTarget.value)} value={inputName} />
                { error !== '' && <ErrorMsg>{ error } </ErrorMsg>}
            
                <Button disabled={ inputName.length > 0 ? false : true } onClick={handleSubmitForm} bg="#000" color="#fff">Pridať</Button>
            </Form>
        </Container>
    )
}

export default Selection