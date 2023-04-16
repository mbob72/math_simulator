import React, {useContext} from "react";
import {PresetsContext} from "@/components/presets.context";
import { AgGridReact } from 'ag-grid-react';
import Grid from "@mui/material/Unstable_Grid2";

const common = [
    { field: 'id', headerName: '№', width: 20 },
    { field: 'example', headerName: 'Example', width: 160, cellRenderer: ({ value: [a, b, _, act]} ) => (
            <><span>{a}</span> <span>{act}</span> <span>{b}</span> <span>=</span> <span>?</span></>
        )
    },
    { field: 'result', headerName: 'Result', type: 'number', width: 80 },
];

const forStudent = { field: 'answer', headerName: 'Res., if shown, time', type: 'number', width: 200,
        cellRenderer: ({ value: { response, isShown, time} }) =>
            <div
                className={'grid gap-4 grid-cols-3 grid-rows-1 content-evenly items-center'}
            >
                <span>{response}</span><input className={'h-4'} type={'checkbox'} checked={isShown} /><span>{time}</span>
            </div>
    }
const fakeAnswers = (students, example) => students.reduce((memo, { name }, i) => ({
    ...memo,
    ['answer' + name]: {
        response: i % 2 ? example[2] : example[2] + 3,
        isShown: !!(i % 2),
        time: i + 45
    }}), {})
export const Lessons = () => {
    const {  lessons, students } = useContext(PresetsContext);

    const columns = common.concat(students.map((st) => {

        return {
            ...forStudent,
            field: forStudent.field + st.name,
            headerName: st.name + ':: ' + forStudent.headerName,
        }
    }))
    console.log(students)



    return (
        <Grid className={'overflow-scroll'}>
            <h3 >Lessons</h3>

            {lessons.length && lessons.map((lesson, i) =>
                <div key={i}
                     style={{ height: (lesson.length + 1) * 41 + 19, width: '900px', marginBottom: '50px' }}
                     className="ag-theme-alpine"
                >
                <AgGridReact
                    rowData={lesson.map(( { example }, i) => ({
                        id: i, example,
                        result: example[2],
                        ...fakeAnswers(students, example)
                    }))}
                    columnDefs={columns}
                />
                </div>)}
        </Grid>
    )
}