import { useContext } from 'react'
import { NewsContext } from './InfoPage'
import { BiSolidChevronsLeft, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'

export default function Pagination({ lastPage }) {
    const { currentInfoPage, setCurrentInfoPage } = useContext(NewsContext)

    const handleFirstPage = () => {
        if (currentInfoPage !== 1) {
            setCurrentInfoPage(1)
        }
    }

    const handleLastPage = () => {
        if (currentInfoPage !== lastPage) {
            setCurrentInfoPage(lastPage)
        }
    }

    const handleNextPage = () => {
        if (currentInfoPage !== lastPage) {
            setCurrentInfoPage((prev) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentInfoPage !== 1) {
            setCurrentInfoPage((prev) => prev - 1)
        }
    }

    const handlePageClick = (page) => {
        if (currentInfoPage !== page) {
            setCurrentInfoPage(page)
        }
    }

    const getPageButtons = () => {
        const range = 2 // Number of pages to show before and after the current page
        const start = Math.max(currentInfoPage - range, 1)
        const end = Math.min(currentInfoPage + range, lastPage)

        const pageButtons = []

        for (let page = start; page <= end; page++) {

            pageButtons.push(
                <button
                    key={page}
                    className={`p-1 me-1 hover:bg-sky-500`}
                    style={{
                        borderRadius: '50%',
                        border: `${page === currentInfoPage ? '1px solid green' : ''}`,
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
        <div className='flex' dir='ltr'>
            <BiSolidChevronsLeft
                color={`${currentInfoPage === 1 ? 'gray' : ''}`}
                className={`p-1 me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleFirstPage}
            />

            <BiSolidChevronLeft
                color={`${currentInfoPage === 1 ? 'gray' : ''}`}
                className={`p-1  me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handlePreviousPage}
            />

            {
                currentInfoPage > 3 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }

            {getPageButtons()}

            {
                currentInfoPage < lastPage - 2 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }


            <BiSolidChevronRight
                color={`${currentInfoPage === lastPage ? 'gray' : ''}`}
                className={`p-1  me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleNextPage}
            />

            <BiSolidChevronsRight
                color={`${currentInfoPage === lastPage ? 'gray' : ''}`}
                className={`p-1 me-1 hover:bg-sky-500`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleLastPage}
            />
        </div>
    )
}
