'use client'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import AddNew from './AddNew';
import { useContext } from 'react';
import { useAdminContext } from '@/hooks/useAdminHooks';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AddSegment() {
    const { addSegmentsPage, setAddSegmentsPage } = useContext(useAdminContext)

    const handleChange = (_event, newAddSegmentsPage) => {
        setAddSegmentsPage(newAddSegmentsPage);
    };

    return (
        <Box
            className='bg-violet-600 ml-4 mt-5 p-3 pr-5 d-flex lg:flex-row flex-col'
            sx={{ flexGrow: 1, display: 'flex', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
        >
            <Tabs
                className='lg:hidden block'
                orientation='horizontal'
                value={addSegmentsPage}
                onChange={handleChange}
                aria-label="Vertical tabs example"
            >
                <Tab label="اخبار" {...a11yProps(0)} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
            </Tabs>
            <Tabs
                className='lg:block hidden self-start'
                orientation='vertical'
                value={addSegmentsPage}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderLeft: 1, borderColor: 'divider' }}
            >
                <Tab label="اخبار" {...a11yProps(0)} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
            </Tabs>
            <div style={{ width: '100%' }}>
                <TabPanel value={addSegmentsPage} index={0}>
                    <div>
                        افزودن خبر
                        <AddNew type='news' />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={1}>
                    <div>
                        افزودن اطلاعیه
                        <AddNew type='announcements' />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={2}>
                    <div>
                        افزودن رویداد
                        <AddNew type='events' />
                    </div>
                </TabPanel>
            </div>
        </Box>
    )
}
