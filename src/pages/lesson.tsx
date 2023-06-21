import {StudentLesson} from "@/components/StudentLesson";
import {Countdown} from "@/components/Timer";
import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import { theme } from "@/theme/theme";

const newTime = new Date(new Date().getTime() + 20*60000);
const fromTime = new Date();
console.log('new time::', newTime)

export default function Lesson() {

    return (
        <ThemeProvider theme={theme}>
            <div className={'grid grid-cols-1'}>
                <Countdown
                    timeTillDate={newTime}
                    allInSec={(newTime - fromTime) / 1000}
                />
                <StudentLesson />
            </div>
        </ThemeProvider>
    )
}