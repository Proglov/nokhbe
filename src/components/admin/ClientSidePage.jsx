'use client'
import { useState } from 'react';
import ControlPanel from '@/components/admin/posts/ControlPanel';
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
import CronjobButtons from './CronjobButtons';

export default function ClientSidePage() {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const adminHooks = useAdminHooks();

    return (
        <div className='min-h-screen'>
            <Typography className="my-3 mr-3 flex" variant="h6" color={'primary'}>
                صفحه ی ادمین
                <span className='m-2'>
                    <GrUserAdmin />
                </span>
            </Typography>

            <CronjobButtons />

            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={`${expanded !== 'panel1' ? 'hover:bg-emerald-100' : ''}`}
                    >
                        <Typography className='flex'>آمار
                            <span className='m-1'>
                                <FcStatistics />
                            </span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <Statistics />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={`${expanded !== 'panel2' ? 'hover:bg-violet-100' : ''}`}
                    >
                        <Typography className='flex'>افزودن پست
                            <span className='m-1'>
                                <MdAddToPhotos />
                            </span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <AddSegment />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={`${expanded !== 'panel3' ? 'hover:bg-cyan-100' : ''}`}
                    >
                        <Typography className='flex'>لیست پست ها
                            <span className='m-1'>
                                <MdTableChart />
                            </span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <ControlPanel />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={`${expanded !== 'panel4' ? 'hover:bg-amber-100' : ''}`}
                    >
                        <Typography className='flex'>لیست اعضا
                            <span className='m-1'>
                                <BsPersonVcard />
                            </span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <useAdminContext.Provider value={adminHooks}>
                            <UsersSection type={'news'} />
                        </useAdminContext.Provider>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>

    );
}
