"use client"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfoPage from './InfoPage';
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

export default function ControlPanel() {
    const { controlPanelsPage, setControlPanelsPage, setCurrentInfoPage } = useContext(useAdminContext)

    const handleChange = (_event, newControlPanelsPage) => {
        setCurrentInfoPage(1)
        setControlPanelsPage(newControlPanelsPage);
    };

    return (
        <Box
            className='mt-5 mb-8 p-2 mr-5 d-flex xl:flex-row flex-col'
            sx={{ flexGrow: 1, display: 'flex', borderBottomRightRadius: '20px', borderTopRightRadius: '20px', background: 'linear-gradient(to right top, #1583f4, #22d3ee 80%)' }}
        >
            <Tabs
                className='xl:hidden block'
                orientation='horizontal'
                value={controlPanelsPage}
                onChange={handleChange}
                aria-label="horizontal tabs example"
            >
                <Tab label="اخبار" {...a11yProps(0)} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
            </Tabs>
            <Tabs
                className='xl:block hidden self-start'
                orientation='vertical'
                value={controlPanelsPage}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderLeft: 1, borderColor: 'divider' }}
            >
                <Tab label="اخبار" {...a11yProps(0)} />
                <Tab label="اطلاعیه" {...a11yProps(1)} />
                <Tab label="رویداد" {...a11yProps(2)} />
            </Tabs>
            <div style={{ width: '100%' }}>
                <TabPanel value={controlPanelsPage} index={0}>
                    <div>
                        اخبار
                    </div>
                    <InfoPage type='news' />
                </TabPanel>
                <TabPanel value={controlPanelsPage} index={1}>
                    <div>
                        اطلاعیه
                    </div>
                    <InfoPage type='announcements' />
                </TabPanel>
                <TabPanel value={controlPanelsPage} index={2}>
                    <div>
                        رویداد
                    </div>
                    <InfoPage type='events' />
                </TabPanel>
            </div>
        </Box>
    );
}
