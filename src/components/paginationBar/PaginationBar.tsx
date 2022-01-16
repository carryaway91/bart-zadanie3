import React, { useEffect, useState } from "react"
import { Container, Fill, Numbers, PageSelector } from "./PaginationBarStyles"

interface IProps {
    perPage: number,
    page: number,
    setPage: (num: number) => void,
    paginatedArray: any[]
}

const PaginationBar: React.FC<IProps> = ({perPage, page, setPage, paginatedArray}) => {
    useEffect(() => {
        const f = JSON.parse(localStorage.getItem('page') || '0')

        setFrom(page - (page % perPage))
        setTo(page - (page % perPage) + perPage)
    }, [])

    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(perPage)
    
    const handleNextFive = () => {
        setPage(from + perPage)
        setFrom(prev => prev + perPage)
        setTo(prev => prev + perPage)
    }
    const handlePrevFive = () => {
        setPage(from - perPage)
        setFrom(prev => prev - perPage)
        setTo(prev => prev - perPage)
    }


    const handleSetPage = (idx: number) => {
        setPage(idx)
    }

    const paginateNum = paginatedArray && paginatedArray.map((array:any, idx: number) => {

        return  <PageSelector key={idx} selected={page === idx} onClick={() => handleSetPage(idx)}>{ idx + 1 }</PageSelector>
      })
    return (
        <Container>
            {
                page >= 5 ? <button onClick={() => handlePrevFive()}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="15" height="15"  x="0px" y="0px"
                    viewBox="0 0 407.436 407.436" >
                <polygon points="315.869,21.178 294.621,0 91.566,203.718 294.621,407.436 315.869,386.258 133.924,203.718 "/>

                </svg>

                </button> : <Fill />
            }
            <Numbers>
                {
                    paginateNum.slice(from, to) 
                }
            </Numbers>
            {
                to < paginatedArray.length ? <button onClick={() => handleNextFive()}>
                    <svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 14L12 7.5L5 1" stroke="black" />
                    </svg>

                </button> : <Fill />
            }
        </Container>
    )
}

export default PaginationBar