"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect, useState, createContext, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RxCross2 } from 'react-icons/rx';
import { FcCheckmark } from 'react-icons/fc';
import ModalConfirm from './ModalConfirm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { deleteImages, getImages } from '@/actions/image';

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

export default function InfoPage({ type, role, tag }) {
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [fileStates, setFileStates] = useState([]);
    const [uploadRes, setUploadRes] = useState([]);
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
        imagesURL: [],
        tags: [],
        createdBy: '',
        telegram: false
    });
    function updateFileProgress(key, progress) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/api/${type}?page=${currentInfoPage}&perPage=${infoItemsPerPage}${!!tag ? '&tag=' + tag : ''}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setInfoItems(data[type]);
                setLastInfoTablePageNumber(Math.ceil(data.count / infoItemsPerPage));
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [currentInfoPage, infoItemsPerPage, setInfoItems, setLastInfoTablePageNumber, type]);

    const editItem = async (obj) => {
        setOperatingID(obj.id);
        setIsModalEditOpen(false);

        //delete images
        if (imagesToDelete.length !== 0)
            await deleteImages(imagesToDelete)

        let newImagesName = [];
        if (obj.imagesName) {
            newImagesName = [...obj.imagesName];
        }
        if (uploadRes) {
            newImagesName = [...newImagesName, ...uploadRes];
        }

        //add new pics to mongodb
        const augmentedObj = {
            ...obj,
            imagesURL: newImagesName
        }

        const newImagesUrl = (await getImages(newImagesName)).urls

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
                    //add the added images to the frontend
                    setInfoItems(prev => {
                        return prev.map(item => {
                            if (item.id === obj.id) {
                                return {
                                    ...augmentedObj,
                                    imagesURL: newImagesUrl
                                }
                            }
                            return item
                        })
                    })
                    setFileStates([]);
                    setImagesToDelete([]);
                    setUploadRes([]);
                }
            })
            .catch((err) => {
                setOperatingError(err);
                setFileStates([]);
                setImagesToDelete([]);
                setUploadRes([]);
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
                                        {
                                            role === 'admin' &&
                                            <StyledTableCell align='center'>ارسال کننده</StyledTableCell>
                                        }
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
                                            {
                                                role === 'admin' &&
                                                <StyledTableCell align='center'>{item.createdBy}</StyledTableCell>
                                            }
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
                                                ) :
                                                    role === 'admin' ?
                                                        (
                                                            <>
                                                                {!item.status && (
                                                                    <Button onClick={() => {
                                                                        setIsModalConfirmOpen(true);
                                                                        setSelectedItem({
                                                                            ...item
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
                                                                            description: item.description,
                                                                            title: item.title,
                                                                            imagesURL: item.imagesURL,
                                                                            createdBy: item.createdBy,
                                                                            tags: item.tags,
                                                                            telegram: item.telegram
                                                                        })
                                                                    }}
                                                                >
                                                                    حذف
                                                                </Button>
                                                            </>
                                                        )
                                                        :
                                                        (
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
                                                                مشاهده بیشتر
                                                            </Button>
                                                        )
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
                            <Pagination dir='ltr' color='primary' variant='outlined' count={lastInfoTablePageNumber} page={currentInfoPage} onChange={(_e, page) => {
                                if (currentInfoPage !== page) setCurrentInfoPage(page)
                            }} />
                        </div>
                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            {
                role === 'admin' &&
                <>
                    <ModalConfirmContext.Provider value={{ isModalConfirmOpen, setIsModalConfirmOpen, confirmItem }}>
                        <ModalConfirm type={type} id={selectedItem.id} title={selectedItem.title} description={selectedItem.description} imagesURL={selectedItem.imagesURL} tags={selectedItem.tags} createdBy={selectedItem.createdBy} eventAt={null || selectedItem.eventAt} />
                    </ModalConfirmContext.Provider>
                    <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, deleteItem }}>
                        <ModalDelete id={selectedItem.id} type={type} />
                    </ModalDeleteContext.Provider>
                </>
            }
            <ModalEditContext.Provider value={{
                isModalEditOpen,
                setIsModalEditOpen,
                setSelectedItem,
                selectedItem,
                fileStates,
                setFileStates,
                setUploadRes,
                updateFileProgress,
                editItem,
                type,
                setImagesToDelete,
                imagesToDelete
            }}>
                <ModalEdit isAdmin={role === 'admin'} />
            </ModalEditContext.Provider>

        </Stack>
    );
}