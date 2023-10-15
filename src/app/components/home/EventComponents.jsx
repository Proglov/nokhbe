import { jalaliMonth } from "@/app/utils/funcs"
import { PiClockDuotone } from 'react-icons/pi'

export default function EventComponents({ day, month, year, desc }) {
    return (
        <div>
            <div className="flex" style={{ alignItems: 'center' }}>
                <div className='flex flex-col bg-blue-950 text-slate-100 rounded text-center p-2'>
                    <div>
                        {day}
                    </div>
                    <div className="text-xs">
                        {jalaliMonth(month)}
                    </div>
                </div>
                <div className="flex flex-col mr-2">
                    <div>
                        {desc}
                    </div>
                    <div className="flex flex-row mt-2">
                        <PiClockDuotone />
                        &nbsp;
                        <span style={{ lineHeight: '15px' }} >{year}/{month}/{day}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}