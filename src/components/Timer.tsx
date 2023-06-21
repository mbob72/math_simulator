// https://www.florin-pop.com/blog/2019/05/countdown-built-with-react/
import React from 'react';
import './Timer.css'
import {Typography, TypographyProps} from "@mui/material/";
export class Countdown extends React.PureComponent<any, any> {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
        allInSec: undefined,
        diff: undefined,
    }
    private interval: NodeJS.Timer;

    componentDidMount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            const { timeTillDate, allInSec } = this.props;
            const fromTime = new Date();
            const _diff = timeTillDate.valueOf() - fromTime.valueOf();
            if(_diff < 0) {
                clearInterval(this.interval)
                return;
            }
            const diff = Math.floor(_diff / 1000)
            const seconds = diff % 60;
            const minutes = Math.floor(diff / 60) % 60;
            const hours = Math.floor(diff / (60*60)) % 24;
            const days = Math.floor(diff / (60*60*24));

            console.log('days, hours::', diff)

            this.setState({ days, hours, minutes, seconds, diff, allInSec });
        }, 1000);
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds, diff, allInSec } = this.state;
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);
        const entire = 360 * (diff / allInSec)
        const cols = 2 + hours ? 1 : 0 + days ? 1 : 0
        return (
            <div>
                <Typography variant={'h4'} className={'text-center'}>Countdown</Typography>
                <div className='grid grid-rows-2 justify-items-center items-center'>
                    <div className={'countdown-item grid grid-flow-col'}>
                    {diff !== undefined && allInSec !== undefined ? (
                        <><div style={{paddingTop: 10}} className='grid-auto'>
                            <SVGCircle radius={entire} />
                            <span>Весь урок</span>
                        </div><br/></>
                    ) : null}
                    </div>
                <div className={'grid grid-flow-col'}>
                        {days  ? (
                        <div className='countdown-item'>
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    ) : null}
                    {hours  ? (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    ) : null}
                    {minutes !== undefined ? (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    ) : null}

                    {seconds !== undefined ? (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
);



// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}