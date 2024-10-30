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

export default function AddSegment({ tag }) {
    const { addSegmentsPage, setAddSegmentsPage } = useContext(useAdminContext)

    const handleChange = (_event, newAddSegmentsPage) => {
        setAddSegmentsPage(newAddSegmentsPage);
    };

    return (
        <Box
            className='ml-4 mt-5 mx-auto p-3 pr-5 d-flex lg:flex-row flex-col text-white'
            sx={{ flexGrow: 1, display: 'flex', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', background: 'linear-gradient(to right top, #22d3ee, #7c3aed 80%)' }}
        >
            <Tabs
                className='lg:hidden block'
                orientation='horizontal'
                value={addSegmentsPage}
                onChange={handleChange}
                variant="scrollable"
                visibleScrollbar
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
                textColor='inherit'
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#D97D54"
                    }
                }}
            >
                <Tab label="اخبار" {...a11yProps(0)} sx={{ color: 'white' }} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
                <Tab label="کتاب" {...a11yProps(3)} />
                <Tab label="مقاله" {...a11yProps(4)} />
            </Tabs>
            <Tabs
                className='lg:block hidden self-start'
                orientation='vertical'
                value={addSegmentsPage}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderLeft: 1, borderColor: 'divider' }}
                textColor='inherit'
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#D97D54"
                    }
                }}
            >
                <Tab label="اخبار" {...a11yProps(0)} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
                <Tab label="کتاب" {...a11yProps(3)} />
                <Tab label="مقاله" {...a11yProps(4)} />
            </Tabs>
            <div style={{ width: '100%' }}>
                <TabPanel value={addSegmentsPage} index={0}>
                    <div>
                        <div className='text-center'>
                            افزودن خبر
                        </div>
                        <AddNew type='news' tag={tag} />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={1}>
                    <div>
                        <div className='text-center'>
                            افزودن اطلاعیه
                        </div>
                        <AddNew type='announcements' tag={tag} />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={2}>
                    <div>
                        <div className='text-center'>
                            افزودن رویداد
                        </div>
                        <AddNew type='events' tag={tag} />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={3}>
                    <div>
                        <div className='text-center'>
                            افزودن کتاب
                        </div>
                        <AddNew type='books' tag={tag} />
                    </div>
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={4}>
                    <div>
                        <div className='text-center'>
                            افزودن مقاله
                        </div>
                        <AddNew type='documents' tag={tag} />
                    </div>
                </TabPanel>
            </div>
        </Box>
    )
}
