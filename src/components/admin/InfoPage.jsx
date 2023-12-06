"use client"
import { Button, Stack } from '@mui/material';
import { useEffect, useState, createContext, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from './Pagination';
import { RxCross2 } from 'react-icons/rx';
import { FcCheckmark } from 'react-icons/fc';
import ModalConfirm from './ModalConfirm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { useEdgeStore } from '@/lib/edgestore';

export const NewsContext = createContext();
export const ModalConfirmContext = createContext();
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
    const [file, setFile] = useState(null);
    const { edgestore } = useEdgeStore();
    const { infoItems, setInfoItems, currentInfoPage, setCurrentInfoPage, lastInfoTablePageNumber, setLastInfoTablePageNumber, infoItemsPerPage, setStaticProps } = useContext(useAdminContext)
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: '',
        title: '',
        description: '',
        imageURL: '',
        tags: [],
        createdBy: '',
        telegram: false
    });

    useEffect(() => {
        setLoading(true);
        fetch(`/api/${type}/count`, { cache: 'no-store' })
            .then((response) => response.json())
            .then((data) => {
                setLastInfoTablePageNumber(Math.ceil(data.count / infoItemsPerPage));
            })
            .catch((err) => {
                setIsError(true);
                setError(err);
            });
        fetch(`/api/${type}?page=${currentInfoPage}&perPage=${infoItemsPerPage}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setInfoItems(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [currentInfoPage]);

    const editItem = async (obj) => {
        setOperatingID(obj.id);

        if (!!file) {
            const imageRes = await edgestore.myPublicImages.upload({
                file,
                options: {
                    replaceTargetUrl: obj.imageURL,
                }
            });
            obj.imageURL = imageRes.url;
        } else {
            const imageRes = await edgestore.myPublicImages.upload({ file });
            obj.imageURL = imageRes.url;
        }

        fetch(`/api/${type}/${obj.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify(obj)
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
                    setInfoItems((prevItems) =>
                        prevItems.map((item) => {
                            if (item.id === obj.id) {
                                return { ...item, ...obj };
                            }
                            return item;
                        })
                    );
                    setFile(null);
                }
            })
            .catch((err) => {
                setOperatingError(err);
            });
    };

    const confirmItem = (id) => {
        setOperatingID(id);
        fetch(`/api/${type}/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({ status: true })
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
                    setInfoItems((prevItems) => prevItems.map((item) => {
                        if (item.id === id) {
                            item.status = true
                        }
                        return item
                    }));

                    //set Static Props
                    if (type === 'news') {
                        setStaticProps(prevProps => ({
                            ...prevProps,
                            negativeStatusNewsCount: prevProps.negativeStatusNewsCount - 1
                        }));
                    } else if (type === 'events') {
                        setStaticProps(prevProps => ({
                            ...prevProps,
                            negativeStatusEventsCount: prevProps.negativeStatusEventsCount - 1
                        }));
                    } else {
                        setStaticProps(prevProps => ({
                            ...prevProps,
                            negativeStatusAnnouncementsCount: prevProps.negativeStatusAnnouncementsCount - 1,
                        }));
                    }
                }
            })
            .catch((err) => {
                setOperatingError(err);
            });
    };

    const deleteItem = (id) => {
        setOperatingID(id);

        //delete image from edgestore
        infoItems.map(async (item) => {
            if (item.id === id && !!item.imageURL) {
                const imageRes = await edgestore.myPublicImages.delete({
                    url: item.imageURL
                });
            }
        })

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
                    setInfoItems((prevItems) => prevItems.filter((item) => item.id !== id));

                    //set Static Props
                    if (type === 'news') {
                        setStaticProps(prevProps => ({
                            ...prevProps, newsCount: prevProps.newsCount - 1,
                            negativeStatusNewsCount: prevProps.negativeStatusNewsCount - 1
                        }));
                    } else if (type === 'events') {
                        setStaticProps(prevProps => ({
                            ...prevProps, eventsCount: prevProps.eventsCount - 1,
                            negativeStatusEventsCount: prevProps.negativeStatusEventsCount - 1
                        }));
                    } else {
                        setStaticProps(prevProps => ({
                            ...prevProps, announcementsCount: prevProps.announcementsCount - 1,
                            negativeStatusAnnouncementsCount: prevProps.negativeStatusAnnouncementsCount - 1,
                        }));
                    }
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
                infoItems?.length !== 0 ?
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>عنوان</StyledTableCell>
                                        <StyledTableCell align='center'>ارسال کننده</StyledTableCell>
                                        <StyledTableCell align='center'>بازدیدها</StyledTableCell>
                                        <StyledTableCell align='center'>برچسب ها</StyledTableCell>
                                        <StyledTableCell align='center'>وضعیت</StyledTableCell>
                                        <StyledTableCell align='center'>تاریخ</StyledTableCell>
                                        <StyledTableCell align='center'>شبکه های اجتماعی</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {infoItems.map((item, index) => (
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + infoItemsPerPage * (currentInfoPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.title}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.createdBy}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.views}</StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center'>
                                                <ul className='flex flex-col justify-center align-middle'>
                                                    {item.tags.map((tag, i) => {
                                                        return <li key={i} className='rtl text-center m-1' style={{ fontSize: '12px', minWidth: '80px' }}>{tag}</li>;
                                                    })}
                                                </ul>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <div
                                                    className='mx-auto'
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        backgroundColor: item.status ? 'green' : 'orange',
                                                        borderRadius: '50%',
                                                    }}
                                                ></div>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.telegram ? <FcCheckmark className='mx-auto' /> : <RxCross2 color='red' className='mx-auto' />}
                                            </StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                {operatingID === item.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        {!item.status && (
                                                            <Button onClick={() => {
                                                                setIsModalConfirmOpen(true);
                                                                setSelectedItem({
                                                                    id: item.id,
                                                                    description: item.description,
                                                                    title: item.title,
                                                                    imageURL: item.imageURL,
                                                                    createdBy: item.createdBy,
                                                                    tags: item.tags,
                                                                    telegram: item.telegram
                                                                })
                                                            }}
                                                                variant='outlined'
                                                                className='p-0 m-1'
                                                                sx={{ color: 'green', borderColor: 'green' }}>
                                                                تایید
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'primary', borderColor: 'primary' }}
                                                            onClick={() => {
                                                                setIsModalEditOpen(true);
                                                                setSelectedItem({
                                                                    id: item.id,
                                                                    description: item.description,
                                                                    title: item.title,
                                                                    imageURL: item.imageURL,
                                                                    createdBy: item.createdBy,
                                                                    tags: item.tags,
                                                                    telegram: item.telegram
                                                                })
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
                                                                    description: item.description,
                                                                    title: item.title,
                                                                    imageURL: item.imageURL,
                                                                    createdBy: item.createdBy,
                                                                    tags: item.tags,
                                                                    telegram: item.telegram
                                                                })
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </>
                                                )}
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
                            <NewsContext.Provider value={{ currentInfoPage, setCurrentInfoPage }}>
                                <Pagination lastPage={lastInfoTablePageNumber} />
                            </NewsContext.Provider>
                        </div>
                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalConfirmContext.Provider value={{ isModalConfirmOpen, setIsModalConfirmOpen, confirmItem }}>
                <ModalConfirm type={type} id={selectedItem.id} title={selectedItem.title} description={selectedItem.description} imageURL={selectedItem.imageURL} tags={selectedItem.tags} createdBy={selectedItem.createdBy} />
            </ModalConfirmContext.Provider>
            <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, deleteItem }}>
                <ModalDelete id={selectedItem.id} type={type} />
            </ModalDeleteContext.Provider>
            <ModalEditContext.Provider value={{
                isModalEditOpen,
                setIsModalEditOpen,
                setSelectedItem,
                selectedItem,
                file,
                setFile,
                editItem,
                type,
            }}>
                <ModalEdit />
            </ModalEditContext.Provider>

        </Stack>
    );
}