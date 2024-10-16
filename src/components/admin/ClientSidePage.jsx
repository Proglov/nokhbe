'use client'
import { useState } from 'react';
import ControlPanel from '@/components/admin/posts/ControlPanel';
import ControlPanelBook from '@/components/admin/books/ControlPanel';
import Statistics from '@/components/admin/Statistics';
import AddSegment from '@/components/admin/addPost/AddSegment';
import useAdminHooks, { useAdminContext } from '@/hooks/useAdminHooks';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UsersSection from './users/UsersSection';
import { FcStatistics } from "react-icons/fc";
import { MdAddToPhotos, MdTableChart } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { FaBookBookmark } from "react-icons/fa6";
import CronjobButtons from './CronjobButtons';

export default function ClientSidePage({ role, clubs }) {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const adminHooks = useAdminHooks();

    return (
        <div className='min-h-screen'>
            <Typography className="my-3 mr-3 flex" variant="h6" color={'primary'}>
                صفحه ی مدیریت
                <span className='m-2'>
                    <GrUserAdmin />
                </span>
            </Typography>

            {
                role == 'admin' &&
                <CronjobButtons />
            }

            <div>
                {
                    role == 'admin' &&
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={`${expanded !== 'panel1' ? 'hover:bg-emerald-100' : ''}`}
                        >
                            <Typography className='flex'>
                                <span className='m-1'>
                                    <FcStatistics />
                                </span>
                                آمار
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <useAdminContext.Provider value={adminHooks}>
                                <Statistics />
                            </useAdminContext.Provider>
                        </AccordionDetails>
                    </Accordion>
                }

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={`${expanded !== 'panel2' ? 'hover:bg-violet-100' : ''}`}
                    >
                        <Typography className='flex'>
                            <span className='m-1'>
                                <MdAddToPhotos />
                            </span>
                            افزودن پست
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <AddSegment tag={clubs ? clubs[0] : undefined} />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        className={`${expanded !== 'panel3' ? 'hover:bg-cyan-100' : ''}`}
                    >
                        <Typography className='flex'>
                            <span className='m-1'>
                                <MdTableChart />
                            </span>
                            لیست پست ها
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <ControlPanel role={role} tag={clubs ? clubs[0] : undefined} />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>

                {
                    role == 'admin' &&
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                            className={`${expanded !== 'panel4' ? 'hover:bg-amber-100' : ''}`}
                        >
                            <Typography className='flex'>
                                <span className='m-1'>
                                    <BsPersonVcard />
                                </span>
                                لیست اعضا
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <useAdminContext.Provider value={adminHooks}>
                                <UsersSection type={'news'} />
                            </useAdminContext.Provider>
                        </AccordionDetails>
                    </Accordion>
                }

                {
                    role == 'admin' &&
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5a-content"
                            id="panel5a-header"
                            className={`${expanded !== 'panel4' ? 'hover:bg-rose-200' : ''}`}
                        >
                            <Typography className='flex'>
                                <span className='m-1'>
                                    <FaBookBookmark />
                                </span>
                                لیست کتاب ها و مقالات
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <useAdminContext.Provider value={adminHooks}>
                                <ControlPanelBook role={role} />
                            </useAdminContext.Provider>
                        </AccordionDetails>
                    </Accordion>
                }
            </div>
        </div>

    );
}
