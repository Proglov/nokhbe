'use client'
import { useState, createContext } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignUp from './SignUp';
import Login from './Login';

export const TabContext = createContext();

export default function SignAndLog() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div style={{ width: '100%', minHeight: '90vh', bgcolor: 'background.paper' }} className='bg-slate-50'>
            <Box className='mt-5'>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="ورود" />
                    <Tab label="ثبت نام" />
                </Tabs>
            </Box>

            {
                tabValue === 1 ?
                    <TabContext.Provider value={{ setTabValue }}>
                        <SignUp />
                    </TabContext.Provider>
                    : ''
            }
            {
                tabValue === 0 ?
                    <TabContext.Provider value={{ setTabValue }}>
                        <Login />
                    </TabContext.Provider>
                    : ''
            }

        </div>
    );
}
