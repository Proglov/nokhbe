'use client';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function CronjobButtons() {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);


    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const activate = async () => {
        fetch('/api/cron', { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                let msg = '';
                let msgColor = 'green';

                if (data?.message === "job is activated") {
                    msg = 'کرون جاب فعال شد!';
                } else if (data?.message === 'job is already running!') {
                    msg = 'کرون جاب از قبل فعال بود !';
                    msgColor = 'red';
                } else {
                    msg = 'امشکلی رخ داد !';
                    msgColor = 'red';
                }

                setMessage(msg);
                setColor(msgColor);

                const id = setTimeout(() => {
                    setMessage('');
                }, 5000);
                setTimeoutId(id);
            })
            .catch(err => {
                setMessage('امشکلی رخ داد !');
                setColor('red');
                clearTimeout(timeoutId);
                const id = setTimeout(() => {
                    setMessage('');
                }, 5000);
                setTimeoutId(id);
                console.log(err);
            });
    };

    const deActivate = async () => {
        fetch('/api/cron', { method: "POST" })
            .then((response) => response.json())
            .then((data) => {
                let msg = '';
                let msgColor = 'green';

                if (data?.message === 'job is stopped') {
                    msg = 'کرون جاب غیر فعال شد!';
                } else if (data?.message === 'job is not running!') {
                    msg = 'کرون جاب فعال نبود !';
                    msgColor = 'red';
                } else {
                    msg = 'امشکلی رخ داد !';
                    msgColor = 'red';
                }

                setMessage(msg);
                setColor(msgColor);

                const id = setTimeout(() => {
                    setMessage('');
                }, 5000);
                setTimeoutId(id);
            })
            .catch(err => {
                setMessage('امشکلی رخ داد !');
                setColor('red');
                clearTimeout(timeoutId);
                const id = setTimeout(() => {
                    setMessage('');
                }, 5000);
                setTimeoutId(id);
                console.log(err);
            });
    };

    return (
        <div className="m-3">
            <div className="mb-3 flex gap-5">
                <Button variant="contained" color="success" className="text-slate-50" onClick={activate}>
                    فعال کردن کرون جاب
                </Button>
                <Button variant="contained" color="error" className="text-slate-50" onClick={deActivate}>
                    غیرفعال کردن کرون جاب
                </Button>
            </div>
            <span className={`mt-5 ${color === 'red' ? 'text-red-600' : 'text-green-500'}`}>
                {message}
            </span>
        </div>
    );
}
