import React, {useContext, useState} from "react";
import {PresetsContext} from "@/components/presets.context";
import {MenuItem, TextField} from "@mui/material";
import {AgGridReact} from "ag-grid-react";



export  function Students() {
    const { students, setInLesson, lessons } = useContext(PresetsContext);

    const [lessonToShow, setLessonToShow] = useState(0);

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'inLesson', headerName: 'Going', type: 'boolean',width: 80, cellRenderer: ({ value, data: { name } } ) => (
                <input type={'checkbox'} checked={!!value} onChange={() => setInLesson(name, !value)}></input>
            )
        },
        { field: 'correctAnswers', headerName: 'Correct', type: 'number', width: 80 },
        { field: 'wrongAnswers', headerName: 'Wrong', type: 'number', width: 80 },
        { field: 'done', headerName: 'Fulfilled', type: 'boolean',width: 80, cellRenderer: ({ value, data: { name } } ) => (
                <input type={'checkbox'} checked={!!value} disabled></input>
            )},
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h3>Students list</h3>
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
