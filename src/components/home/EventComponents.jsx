import { PiClockDuotone } from 'react-icons/pi'
import { convertEventAt, dateInFarsi, jalaliMonthEn } from '@/utils/funcs'

export default function EventComponents({ date, title }) {
    const arrDate = convertEventAt(date)

    return (
        <div>
            <div className="flex" style={{ alignItems: 'center' }}>
                <div className='flex flex-col bg-blue-950 text-slate-100 rounded text-center p-2'>
                    <div>
                        {dateInFarsi(arrDate[2])}
                    </div>
                    <div className="text-xs">
                        {jalaliMonthEn(arrDate[1])}
                    </div>
                </div>
                <div className="flex flex-col mr-2">
                    <div>
                        {title}
                    </div>
                    <div className="flex flex-row mt-2">
                        <PiClockDuotone />
                        &nbsp;
                        <span dir='ltr' style={{ lineHeight: '15px' }} >{dateInFarsi(date)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}