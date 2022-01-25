import React, { useEffect, useState } from 'react'
import { Container } from './NotificationStyles'

interface IProps {
    message: string
}

const Notification: React.FC<IProps> = ({ message }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 2000)
    },[])


    
    return (
        <Container show={show}>
            <p>{ message }</p>
        </Container>
    )
}

export default Notification