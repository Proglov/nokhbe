import { PiClockDuotone } from 'react-icons/pi'
import { giveMeDateInFa } from '@/utils/funcs'

export default function EventComponents({ date, title }) {
    return (
        <div>
            <div className="flex" style={{ alignItems: 'center' }}>
                <div className='flex flex-col bg-blue-950 text-slate-100 rounded text-center p-2'>
                    <div>
                        {giveMeDateInFa(date)[2]}
                    </div>
                    <div className="text-xs">
                        {giveMeDateInFa(date)[1]}
                    </div>
                </div>
                <div className="flex flex-col mr-2">
                    <div>
                        {title}
                    </div>
                    <div className="flex flex-row mt-2">
                        <PiClockDuotone />
                        &nbsp;
                        <span style={{ lineHeight: '15px' }} >{date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}