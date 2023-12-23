import { useContext } from 'react'
import { UsersContext } from './UsersSection'
import { BiSolidChevronsLeft, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'

export default function Pagination({ lastPage }) {
    const { currentPage, setCurrentPage } = useContext(UsersContext)

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1)
        }
    }

    const handleLastPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page)
        }
    }

    const getPageButtons = () => {
        const range = 2 // Number of pages to show before and after the current page
        const start = Math.max(currentPage - range, 1)
        const end = Math.min(currentPage + range, lastPage)

        const pageButtons = []

        for (let page = start; page <= end; page++) {

            pageButtons.push(
                <button
                    key={page}
                    className={`p-1 me-1 hover:bg-sky-500`}
                    style={{
                        borderRadius: '50%',
                        border: `${page === currentPage ? '1px solid #58ff00' : ''}`,
                        fontSize: '10px',
                        width: '30px',
                        height: '30px',
                        lineHeight: '23px'
                    }}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            )
        }

        return pageButtons
    }

    return (
        <div className='flex text-white' dir='ltr'>
            <BiSolidChevronsLeft
                color={`${currentPage === 1 ? 'gray' : ''}`}
                className={`p-1 me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleFirstPage}
            />

            <BiSolidChevronLeft
                color={`${currentPage === 1 ? 'gray' : ''}`}
                className={`p-1  me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handlePreviousPage}
            />

            {
                currentPage > 3 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }

            {getPageButtons()}

            {
                currentPage < lastPage - 2 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }


            <BiSolidChevronRight
                color={`${currentPage === lastPage ? 'gray' : ''}`}
                className={`p-1  me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleNextPage}
            />

            <BiSolidChevronsRight
                color={`${currentPage === lastPage ? 'gray' : ''}`}
                className={`p-1 me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleLastPage}
            />
        </div>
    )
}
