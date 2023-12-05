'use client'
import ControlPanel from '@/components/admin/ControlPanel';
import Statistics from '@/components/admin/Statistics';
import AddSegment from '@/components/admin/AddSegment';
import useAdminHooks, { useAdminContext } from '@/hooks/useAdminHooks';
import { Typography } from '@mui/material';

export default function ClientSidePage() {

    const adminHooks = useAdminHooks();

    return (
        <div>
            <Typography className="my-3 mr-3" variant="h6" color={'primary'}>
                صفحه ی ادمین
            </Typography>

            <div>
                <div>
                    <useAdminContext.Provider value={adminHooks}>
                        <Statistics />
                    </useAdminContext.Provider>
                </div>
                <div>
                    <useAdminContext.Provider value={adminHooks}>
                        <AddSegment />
                    </useAdminContext.Provider>
                </div>
                <div>
                    <useAdminContext.Provider value={adminHooks}>
                        <ControlPanel />
                    </useAdminContext.Provider>
                </div>
            </div>
        </div>

    );
}
