"use client"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button, Chip, FormGroup, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { ModalEditContext } from './UsersSection';
import { convertRoles } from '@/utils/funcs';
import { roles, tags as tagOptions } from '@/utils/tagsAndRoles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 800,
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: '0px 0px 10px 1px purple',
    p: 4,
};



export default function ModalEdit() {

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'fullName') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                fullName: value,
            }));
        } else if (name === 'email') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                email: value,
            }));
        } else if (name === 'username') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                username: value,
            }));
        } else if (name === 'nationalCode') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                nationalCode: value,
            }));
        } else if (name === 'mobileNumber') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                mobileNumber: value,
            }));
        } else if (name === 'phoneNumber') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                phoneNumber: value,
            }));
        } else if (name === 'address') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                address: value,
            }));
        } else if (name === 'postalCode') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                postalCode: value,
            }));
        } else if (name === 'biography') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                biography: value,
            }));
        } else if (name === 'education') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                education: value,
            }));
        } else if (name === 'abilities') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                abilities: value,
            }));
        } else if (name === 'role') {
            let r;
            if (value === 'ادمین')
                r = "Admin"
            else if (value === "کاربر عادی")
                r = "normal"
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                role: r,
            }));
        } else if (name === 'tags') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                club: value,
            }));
        }
    };

    const { isModalEditOpen, setIsModalEditOpen, selectedItem, setSelectedItem, editItem } = useContext(ModalEditContext)
    const handleClose = () => setIsModalEditOpen(false);

    let IranDate
    if (!!selectedItem.joinedAt)
        IranDate = new Intl.DateTimeFormat('fa-IR').format(new Date(selectedItem.joinedAt))

    return (
        <Modal
            className='overflow-y-scroll'
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalEditOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}>
            <Fade in={isModalEditOpen}>
                <Box sx={ModalStyle} className='rounded-3xl'>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        اطلاعات کاربر
                    </Typography>

                    <div className="mt-5">
                        <FormGroup className="w-full">
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="fullName">
                                            نام
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="fullName"
                                            type="text"
                                            name="fullName"
                                            value={selectedItem.fullName}
                                            placeholder="نام"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="email">
                                            ایمیل
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="email"
                                            type="text"
                                            name="email"
                                            value={selectedItem.email}
                                            placeholder="ایمیل"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="username">
                                            نام کاربری
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={selectedItem.username}
                                            placeholder="نام کاربری"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="nationalCode">
                                            کد ملی
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="nationalCode"
                                            type="text"
                                            name="nationalCode"
                                            value={selectedItem.nationalCode}
                                            placeholder="کد ملی"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="mobileNumber">
                                            تلفن همراه
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="mobileNumber"
                                            type="text"
                                            name="mobileNumber"
                                            value={selectedItem.mobileNumber}
                                            placeholder="تلفن همراه"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="phoneNumber">
                                            تلفن ثابت
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="phoneNumber"
                                            type="text"
                                            name="phoneNumber"
                                            value={selectedItem.phoneNumber}
                                            placeholder="تلفن ثابت"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="address">
                                            آدرس
                                        </label>
                                    </div>
                                    <div>
                                        <textarea class="resize-none rounded-md border border-solid w-full focus:border-purple-500 focus:bg-white bg-gray-200" name="address" id="address" onChange={handleChange} value={selectedItem.address} placeholder="  آدرس" />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="postalCode">
                                            کد پستی
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="postalCode"
                                            type="text"
                                            name="postalCode"
                                            value={selectedItem.postalCode}
                                            placeholder="کد پستی"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="biography">
                                            بیوگرافی
                                        </label>
                                    </div>
                                    <div>
                                        <textarea class="resize-none rounded-md border border-solid w-full focus:border-purple-500 focus:bg-white bg-gray-200" name="biography" id="biography" onChange={handleChange} value={selectedItem.biography} placeholder="بیوگرافی" />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="education">
                                            تحصیلات
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="education"
                                            type="text"
                                            name="education"
                                            value={selectedItem.education}
                                            placeholder="تحصیلات"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="abilities">
                                            توانایی ها
                                        </label>
                                    </div>
                                    <div>
                                        <textarea class="resize-none rounded-md border border-solid w-full focus:border-purple-500 focus:bg-white bg-gray-200" name="abilities" id="abilities" onChange={handleChange} value={selectedItem.abilities} placeholder="توانایی ها" />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <label htmlFor="joinedAt">
                                            تاریخ ثبت نام
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none bg-white"
                                            id="joinedAt"
                                            type="text"
                                            name="joinedAt"
                                            value={IranDate}
                                            disabled
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} className="mt-2">
                                    <div>
                                        <label htmlFor="role">
                                            نقش
                                        </label>
                                    </div>
                                    <Select
                                        name="role"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:bg-white focus:border-purple-500`}
                                        labelId="role-label"
                                        id="role"
                                        value={convertRoles(selectedItem.role)}
                                        onChange={handleChange}
                                        MenuProps={MenuProps}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem
                                                key={role}
                                                value={role}
                                            >
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item xs={12} className="mt-2">
                                    <div>
                                        <label htmlFor="demo-multiple-chip-label">
                                            کارگروه ها
                                        </label>
                                    </div>
                                    <Select
                                        name="tags"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:bg-white focus:border-purple-500`}
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={selectedItem.club}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {tagOptions.map((tag) => (
                                            <MenuItem
                                                key={tag}
                                                value={tag}
                                            >
                                                {tag}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                            </Grid>
                        </FormGroup>
                    </div>

                    <div className='mt-2 flex justify-between'>
                        <Button
                            onClick={() => { handleClose(); editItem(selectedItem) }}
                            variant='outlined'
                            className='p-0 m-1'
                            sx={{ color: 'green', borderColor: 'green' }}>
                            تایید
                        </Button>
                        <Button onClick={handleClose} variant='outlined'
                            className='p-0 m-1'
                            sx={{ color: 'red', borderColor: 'red' }}>
                            لغو
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
