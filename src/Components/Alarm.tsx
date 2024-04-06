import React, { useState, useEffect } from "react";

function Alarm() {
    const [alarmTime] = useState(new Date("2024-04-30T16:20:00"));
    const [isAlarmActive, setIsAlarmActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= alarmTime) {
                setIsAlarmActive(true);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [alarmTime]);

    const handleDismissAlarm = () => {
        setIsAlarmActive(false);
    };

    return (
        <div>
            {isAlarmActive && (
                <div>
                    <audio autoPlay>
                        <source src="alarm-sound.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <div>Alarm çalıyor!</div>
                    <button onClick={handleDismissAlarm}>Alarmı Kapat</button>
                </div>
            )}
        </div>
    );
}

export default Alarm;
