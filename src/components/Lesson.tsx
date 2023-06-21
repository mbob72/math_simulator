import {AgGridReact} from "ag-grid-react";
import React, {useEffect} from "react";
import {ColDef} from "ag-grid-community";
import Grid from "@mui/material/Unstable_Grid2";
import {Checkbox} from "@mui/joy";

import Button from '@mui/material/Button';
import {
    allStudentsCheckedSelector,
    lessonsSlice, mixStudentsCheckedSelector,
    selectLesson,
    studentCheckedSelector
} from "@/store/lessons.slice";
import {Student} from "@/store/students.slice";
import {useAppDispatch, useAppSelector} from "@/store";
import LinearDeterminate from "@/components/Progress";
import LessonDiagram from "@/components/Timeline"
import {Countdown} from "@/components/Timer";

const fakeAnswers = (students, example) => students.reduce((memo, { name }, i) => ({
    ...memo,
    ['answer' + name]: {
        response: i % 2 ? example[2] : example[2] + 3,
        isShown: !!(i % 2),
        time: i + 45
    }}), {})

export type LessonProps = { columns: ColDef[]; students: Student[]; id: number; ind: number }
export const Lesson = ({ columns, students, id, ind }: LessonProps) => {
    const { liveExamples, lessonStatus: { status, students: lessonStudents } } = useAppSelector(store => selectLesson(store, ind));
    const allStudentsChecked = useAppSelector(store => allStudentsCheckedSelector(store, ind));
    const mixStudentsChecked = useAppSelector(store => mixStudentsCheckedSelector(store, ind));
    const dispatch = useAppDispatch();
    useEffect(() => {
        let lessons = localStorage.getItem('lessons') ? JSON.parse(localStorage.getItem('lessons')) : {};
        lessons = {
            ...lessons,
            [id]: liveExamples
        }
        localStorage.setItem('lessons', JSON.stringify(lessons))
    }, [liveExamples])

    useEffect(() => {
        let lessonsStatus = localStorage.getItem('statuses') ? JSON.parse(localStorage.getItem('statuses')) : {};
        lessonsStatus = {
            ...lessonsStatus,
            [id]: status
        }
        localStorage.setItem('statuses', JSON.stringify(lessonsStatus))
    }, [status])
    return (
        <>
            <div
                 style={{ height: (liveExamples.length + 1) * 41 + 19, width: '100%', maxWidth: '880px', marginBottom: '50px' }}
                 className="ag-theme-alpine"
            >
                <AgGridReact
                    rowData={liveExamples.map(( { example }, i) => ({
                        id: i, example,
                        result: example[2],
                        ...fakeAnswers(students, example)
                    }))}
                    columnDefs={columns}
                />
            </div>
            {(() => {
                switch(status) {
                    case 'setup':
                        return <>
                            <Button onClick={() => dispatch(lessonsSlice.actions.lunchLesson(ind))}>Lunch lesson</Button>
                            <h3>To Lesson::</h3><br/>
                            {lessonStudents.length > 1 && <Checkbox
                                label="All students"
                                checked={allStudentsChecked}
                                indeterminate={mixStudentsChecked}
                                onChange={() => {
                                    dispatch(lessonsSlice.actions.handleChangeAll({ ind, allStudentsChecked }))
                                }}
                            />}
                            {lessonStudents.length && lessonStudents.map(student => <Student key={student.name} student={student} ind={ind} />)}
                            </>
                    case 'inProgress':
                        return <>
                            <LinearDeterminate />
                            {lessonStudents.length &&
                                lessonStudents.filter(({ status }) => status === 'started').map(st => <div key={st.name}>
                                    {st.name}<LessonDiagram />
                                </div>)}
                            <Button onClick={() => lessonsSlice.actions.lunchLesson( ind )}>Make break</Button>
                            <Button onClick={() => lessonsSlice.actions.lunchLesson( ind )}>Finish</Button>
                            <Countdown
                                timeTillDate="05 26 2019, 6:00 am"
                                timeFormat="MM DD YYYY, h:mm a"
                            />,
                        </>
                    default:
                        return ''
                }
            })()}
        </>
    )
}

const Student = ({ student, ind }) => {
    const checked = useAppSelector(store => studentCheckedSelector(store, ind, student.name));
    const dispatch = useAppDispatch();
    return (
        <Grid key={student.name}>
            <Checkbox
                label={student.name}
                checked={checked}
                onChange={() => dispatch(lessonsSlice.actions.studentInLessonChange({ studentName: student.name, idLesson: ind }))}
            />
        </Grid>
    )
}