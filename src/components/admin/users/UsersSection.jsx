"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect, useState, createContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertRoles } from '@/utils/funcs';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

export const UsersContext = createContext();
export const ModalEditContext = createContext();
export const ModalDeleteContext = createContext();

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

export default function UsersSection() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPageNumber, setLastPageNumber] = useState(0);
    const usersPerPage = 20;
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: '',
        email: '',
        username: '',
        role: '',
        fullName: '',
        nationalCode: '',
        mobileNumber: '',
        phoneNumber: '',
        address: '',
        postalCode: '',
        biography: '',
        education: '',
        abilities: '',
        club: [],
        joinedAt: '',
    });

    useEffect(() => {
        setLoading(true);
        fetch(`/api/user?page=${currentPage}&perPage=${usersPerPage}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setUsers(data?.users);
                setLastPageNumber(Math.ceil(data?.count / usersPerPage));
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [currentPage]);

    const editItem = async (obj) => {
        setOperatingID(obj.id);

        fetch(`/api/user/${obj.id}`, {
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
                    setUsers((prevItems) =>
                        prevItems.map((user) => {
                            if (user.id === obj.id) {
                                return { ...user, ...obj };
                            }
                            return user;
                        })
                    );
                    setFile(null);
                }
            })
            .catch((err) => {
                setOperatingError(err);
            });
    };

    const deleteItem = (id) => {
        setOperatingID(id);

        fetch(`/api/user/${id}`, { method: 'DELETE' })
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
                    setUsers((prevItems) => prevItems.filter((item) => item.id !== id));
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
                users?.length !== 0 ?
                    <div className='mb-8 pt-5 p-2 mr-5' style={{ borderBottomRightRadius: '20px', borderTopLeftRadius: '20px', background: 'linear-gradient(to right top,#3c6650,#008eff, #663c3c 80% )' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>نام کاربری</StyledTableCell>
                                        <StyledTableCell align='center'>ایمیل</StyledTableCell>
                                        <StyledTableCell align='center'>نقش</StyledTableCell>
                                        <StyledTableCell align='center'>کد ملی</StyledTableCell>
                                        <StyledTableCell align='center'>شماره موبایل</StyledTableCell>
                                        <StyledTableCell align='center'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <StyledTableRow key={user.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + usersPerPage * (currentPage - 1)}</StyledTableCell>

                                            <StyledTableCell align='center'>{user.fullName}</StyledTableCell>

                                            <StyledTableCell align='center'>{user.username}</StyledTableCell>

                                            <StyledTableCell align='center'>{user.email}</StyledTableCell>

                                            <StyledTableCell align='center'>{convertRoles(user.role)}</StyledTableCell>

                                            <StyledTableCell align='center'>{user.nationalCode}</StyledTableCell>

                                            <StyledTableCell align='center'>{user.mobileNumber}</StyledTableCell>

                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>

                                                {operatingID === user.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'primary', borderColor: 'primary' }}
                                                            onClick={() => {
                                                                setIsModalEditOpen(true);
                                                                setSelectedItem({
                                                                    id: user.id,
                                                                    email: user.email,
                                                                    username: user.username,
                                                                    role: user.role,
                                                                    fullName: user.fullName,
                                                                    nationalCode: user.nationalCode,
                                                                    mobileNumber: user.mobileNumber,
                                                                    phoneNumber: user.phoneNumber,
                                                                    address: user.address,
                                                                    postalCode: user.postalCode,
                                                                    biography: user.biography,
                                                                    education: user.education,
                                                                    abilities: user.abilities,
                                                                    club: user.club,
                                                                    joinedAt: user.joinedAt,
                                                                })
                                                            }}
                                                        >
                                                            نمایش و ویرایش
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedItem({
                                                                    id: user.id,
                                                                    email: user.email,
                                                                    username: user.username,
                                                                    role: user.role,
                                                                    fullName: user.fullName,
                                                                    nationalCode: user.nationalCode,
                                                                    mobileNumber: user.mobileNumber,
                                                                    phoneNumber: user.phoneNumber,
                                                                    address: user.address,
                                                                    postalCode: user.postalCode,
                                                                    biography: user.biography,
                                                                    education: user.education,
                                                                    abilities: user.abilities,
                                                                    club: user.club,
                                                                    joinedAt: user.joinedAt,
                                                                })
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </>
                                                )}
                                                {operatingID === user.id && operatingError !== '' ? (
                                                    <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
                                                ) : ''}
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <Pagination dir='ltr' color='primary' variant='' count={lastPageNumber} page={currentPage} onChange={(_e, page) => {
                                if (currentPage !== page) setCurrentPage(page)
                            }} />
                        </div>

                    </div>

                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalEditContext.Provider value={{
                isModalEditOpen,
                setIsModalEditOpen,
                setSelectedItem,
                selectedItem,
                editItem
            }}>
                <ModalEdit />
            </ModalEditContext.Provider>

            <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, deleteItem }}>
                <ModalDelete id={selectedItem.id} />
            </ModalDeleteContext.Provider>

        </Stack>
    );
}