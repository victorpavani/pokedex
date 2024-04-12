import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import './Clock_styles.css';

const MyFlipClock = () => {
    // Calculate the total milliseconds for 10 days, 22 hours, and 55 minutes
    const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000;
    const twentyTwoHoursInMillis = 22 * 60 * 60 * 1000;
    const fiftyFiveMinutesInMillis = 55 * 60 * 1000;

    // Calculate the total milliseconds for the countdown
    const countdownInMillis = new Date().getTime() + tenDaysInMillis + twentyTwoHoursInMillis + fiftyFiveMinutesInMillis;

    return (
        <FlipClockCountdown to={countdownInMillis} className='flip-clock' />
    );
};

export default MyFlipClock;
