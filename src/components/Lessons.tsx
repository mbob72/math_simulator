import React, {useContext} from "react";
import {StateContext} from "@/components/stateContext";
import Grid from "@mui/material/Unstable_Grid2";
import {Lesson} from "@/components/Lesson";

const common = [
    { field: 'id', headerName: '№', width: 20, pinned: 'left' },
    { field: 'example', headerName: 'Example', width: 160, pinned: 'left', cellRenderer: ({ value: [a, b, _, act]} ) => (
            <><span>{a}</span> <span>{act}</span> <span>{b}</span> <span>=</span> <span>?</span></>
        )
    },
    { field: 'result', headerName: 'Result', type: 'number', width: 80, pinned: 'left'  },
];

const forStudent = { field: 'answer', headerName: 'Res., if shown, time', type: 'number', width: 200,
        cellRenderer: ({ value: { response, isShown, time} }) =>
            <div
                className={'grid gap-4 grid-cols-3 grid-rows-1 content-evenly items-center'}
            >
                <span>{response}</span><input className={'h-4'} type={'checkbox'} checked={isShown} /><span>{time}</span>
            </div>
    }

export const Lessons = () => {
    const {  lessons, students } = useContext(StateContext);

    const columns = common.concat(students.map((st) => {
        return {
            ...forStudent,
            field: forStudent.field + st.name,
            headerName: st.name + ':: ' + forStudent.headerName,
        }
    }))

    return (
        <Grid className={'overflow-scroll'}>
            <h3 >Lessons</h3>
            {lessons.length && lessons.map((lesson, i) => <Lesson key={i} {...{ lesson, columns, students }} />)}
        </Grid>
    )
}