import {AgGridReact} from "ag-grid-react";
import React, {useContext} from "react";
import {LessonLive, Student} from "@/components/lessons.hooks";
import {ColDef} from "ag-grid-community";
import {Button} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {StateContext} from "@/components/stateContext";
import {Checkbox} from "@mui/joy";

const fakeAnswers = (students, example) => students.reduce((memo, { name }, i) => ({
    ...memo,
    ['answer' + name]: {
        response: i % 2 ? example[2] : example[2] + 3,
        isShown: !!(i % 2),
        time: i + 45
    }}), {})

export type LessonProps = { lesson: LessonLive; columns: ColDef[]; students: Student[] }
export const Lesson = ({ lesson, columns }: LessonProps) => {
    const { liveExamples, lessonStatus: { status, students: lessonStudents } } = lesson;
    const { students, studentChecked, studentChange,
        lunchLesson, allStudentsChecked, mixStudentsChecked, handleChangeAdd} = useContext(StateContext);


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
                            <Button onClick={lunchLesson(lesson)}>Lunch lesson</Button>
                            <h3>To Lesson::</h3><br/>
                            {lessonStudents.length > 1 && <Checkbox
                                label="All students"
                                checked={allStudentsChecked(lesson)}
                                indeterminate={mixStudentsChecked(lesson)}
                                onChange={handleChangeAdd(lesson)}
                            />}
                            {lessonStudents.length && lessonStudents.map(student => (<Grid key={student.name}>
                                    <Checkbox
                                        label={student.name}
                                        checked={studentChecked(student.name, lesson)}
                                        onChange={studentChange(student.name, lesson)}
                                    />
                                </Grid>
                            ))}
                            </>
                    case 'inProgress':
                        return <>
                            <Button onClick={lunchLesson(lesson)}>Make break</Button>
                            <Button onClick={lunchLesson(lesson)}>Finish</Button>
                            {lessonStudents.length && lessonStudents.filter(({ status }) => status === 'started').map(st => <div key={st.name}>{st.name}</div>)}
                        </>
                    default:
                        return ''
                }
            })()}
        </>
    )
}