import React, {useContext, useState} from "react";
import {PresetsContext} from "@/components/presets.context";
import {DataGrid, GridColDef, GridValueGetterParams, GridValueSetterParams} from '@mui/x-data-grid';



export  function Students() {
    const { students, setInLesson } = useContext(PresetsContext);
    const valueSetter = (params: GridValueSetterParams) => {
        setInLesson(params.row.name, params.value)
        return params.row
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'inLesson', headerName: 'Going', type: 'boolean',width: 70, valueSetter, editable: true },
        { field: 'correctAnswers', headerName: 'Correct', type: 'number', width: 100 },
        { field: 'wrongAnswers', headerName: 'Wrong', type: 'number', width: 100 },
        { field: 'done', headerName: 'Fulfilled', type: 'boolean',width: 70 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {students.length && <DataGrid
                rows={students}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(a) => { console.log(a); return a?.name || 'kjlkj' }}
            />}
        </div>
    );
}
