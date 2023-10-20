import { Divider, List, Typography } from '@mui/material'
import SideInfo from './SideInfo'

export default function LastNews() {
    return (
        <>
            <Typography className='mb-3' variant='h1' sx={{ fontSize: '20px' }}>
                آخرین اخبار
            </Typography>
            <Divider />
            <List>
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
                <SideInfo title='نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه' year={1398} month={6} day={3} />
            </List>
        </>
    )
}
