"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


export const ModalDeleteContext = createContext();
export const ModalEditContext = createContext();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function InfoPage({ type }) {
    const [loading, setLoading] = useState([])
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const itemsPerPage = 20
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: '',
        name: '',
        writer: '',
        category: '',
        link: '',
        pubOrMag: '',
    });

    useEffect(() => {
        setLoading(true);
        fetch(`/api/${type}?page=${currentPage}&perPage=${itemsPerPage}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')

                setItems(data[type].map(item => ({
                    id: item.id,
                    name: item.name,
                    writer: item.writer,
                    category: item.category,
                    link: item.link || '',
                    pubOrMag: item.publisher || item.magazine,
                })));
                setLastPage(Math.ceil(data.count / itemsPerPage));
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [currentPage, itemsPerPage, setItems, setLastPage, type]);


    const editItem = async (obj) => {
        setOperatingID(obj.id);
        setIsModalEditOpen(false);

        const augmentedObj = { ...obj }
        augmentedObj[type === 'books' ? 'publisher' : 'magazine'] = augmentedObj.pubOrMag

        fetch(`/api/${type}/${obj.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify(augmentedObj)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                setOperatingID('');
                if (data?.error?.name === "PrismaClientKnownRequestError") {
                    setOperatingError(data?.message + ' ; ' + data?.error?.meta?.message)
                } else {
                    setItems(prevItems => prevItems.map(item => {
                        if (item.id === obj.id) return obj
                        return item
                    }))
                }
            })
            .catch(err => setOperatingError(err));
    };

    const deleteItem = (id) => {
        setOperatingID(id);

        fetch(`/api/${type}/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                setOperatingID('');
                if (data?.error?.name === "PrismaClientKnownRequestError") {
                    setOperatingError(data?.message + ' ; ' + data?.error?.meta?.message)
                } else {
                    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                }
            })
            .catch((err) => {
                setOperatingError(err);
            });
    };

    return (
        <Stack spacing={2} className='mt-10'>
            {isError ? (
                <div>
                    مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                    <br />
                    {error.toString()}
                </div>
            ) : loading ? (
                <div>درحال دریافت اطلاعات ...</div>
            ) : (
                items?.length !== 0 ?
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>عنوان</StyledTableCell>
                                        <StyledTableCell align='center'>نویسنده</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {
                                                type === 'books' ?
                                                    'انتشارات'
                                                    : 'مجله'
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                        <StyledTableCell align='center'>لینک</StyledTableCell>
                                        <StyledTableCell align='center'>عملبات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.writer}</StyledTableCell>
                                            <StyledTableCell align='center'>{item?.pubOrMag} </StyledTableCell>
                                            <StyledTableCell align='center'>{item.category}</StyledTableCell>
                                            <StyledTableCell align='center'>{item?.link || 'ناموجود'}</StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                {operatingID === item.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) :
                                                    <>
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'primary', borderColor: 'primary' }}
                                                            onClick={() => {
                                                                setIsModalEditOpen(true);
                                                                setSelectedItem({
                                                                    ...item
                                                                });
                                                            }}
                                                        >
                                                            ویرایش
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedItem({
                                                                    id: item.id,
                                                                    name: item?.name,
                                                                    writer: item?.writer,
                                                                    category: item?.category,
                                                                    link: item?.link,
                                                                    pubOrMag: item?.pubOrMag
                                                                })
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </>
                                                }
                                                {operatingID === item.id && operatingError !== '' ? (
                                                    <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
                                                ) : ''}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <Pagination dir='ltr' color='primary' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, page) => {
                                if (currentPage !== page) setCurrentPage(page)
                            }} />
                        </div>
                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, deleteItem }}>
                <ModalDelete id={selectedItem.id} type={type} />
            </ModalDeleteContext.Provider>

            <ModalEditContext.Provider value={{
                isModalEditOpen,
                setIsModalEditOpen,
                setSelectedItem,
                selectedItem,
                editItem,
                type,
            }}>
                <ModalEdit />
            </ModalEditContext.Provider>

        </Stack>
    );
}