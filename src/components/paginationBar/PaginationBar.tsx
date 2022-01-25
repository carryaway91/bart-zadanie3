import React, { useEffect, useState } from "react"
import { Container, Fill, Numbers, PageSelector } from "./PaginationBarStyles"
import Left from '../../img/icons/double-left.png'
import Right from '../../img/icons/double-right.png'


interface IProps {
    perPage: number,
    page: number,
    setPage: (num: number) => void,
    paginatedArray: any[]
}

const PaginationBar: React.FC<IProps> = ({perPage, page, setPage, paginatedArray}) => {
    useEffect(() => {
        JSON.parse(localStorage.getItem('page') || '0')
        setFrom(page - (page % perPage))
        setTo(page - (page % perPage) + perPage)
    }, [page, perPage])

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
                    <img src={Left} alt='left arrows' width="20"/>
                </button> : <Fill />
            }
            <Numbers>
                {
                    paginateNum.slice(from, to) 
                }
            </Numbers>
            {
                to < paginatedArray.length ? <button onClick={() => handleNextFive()}>
                   <img src={Right} alt="right arrows" width="20" />
                </button> : <Fill />
            }
        </Container>
    )
}

export default PaginationBar