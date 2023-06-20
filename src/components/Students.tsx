import React, {useState} from "react";
import {MenuItem, TextField} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import {useAppDispatch, useAppSelector} from "@/store";
import {studentsSelector} from "@/store/students.slice";
import {studentsSlice} from "@/store/students.slice";
import {selectLessonsSelector} from "@/store/lessons.slice";
import {Typography} from "@material-ui/core";


export  function Students() {
    const students = useAppSelector(studentsSelector);
    const lessons = useAppSelector(selectLessonsSelector);
    const dispatch = useAppDispatch();
    const [lessonToShow, setLessonToShow] = useState(0);

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'inLesson', headerName: 'Going', width: 80, cellRenderer: ({ value, data: { name } } ) => (
                <input type={'checkbox'} checked={!!value}
                       onChange={() => dispatch(studentsSlice.actions.setInLesson({ name, val: !value }))}
                ></input>
            )
        },
        { field: 'correctAnswers', headerName: 'Correct', type: 'numericColumn', width: 80 },
        { field: 'wrongAnswers', headerName: 'Wrong', type: 'numericColumn', width: 80 },
        { field: 'done', headerName: 'Fulfilled', width: 80, cellRenderer: ({ value, data: { name } } ) => (
                <input type={'checkbox'} checked={!!value} readOnly disabled></input>
            )},
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant={'h4'} className={'text-center m-2'} >Students list </Typography>
            {lessons.length && (
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Lesson"
                    value={lessonToShow}
                    onChange={(e) => {setLessonToShow(Number(e.target.value))}}
                    helperText=""
                >
                    {lessons.map((option, i) => (
                        <MenuItem key={i} value={i}>
                            Lesson {i}
                        </MenuItem>
                    ))}
                </TextField>
            )}
            {students.length &&
                <div
                     style={{ height: (students.length + 1) * 41 + 19, width: '420px', marginBottom: '50px' }}
                     className="ag-theme-alpine"
                >
                    <AgGridReact
                        rowData={students}
                        columnDefs={columns}
                    />
                </div>
            }
        </div>
    );
}
