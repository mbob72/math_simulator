import {AgGridReact} from "ag-grid-react";
import React from "react";

const fakeAnswers = (students, example) => students.reduce((memo, { name }, i) => ({
    ...memo,
    ['answer' + name]: {
        response: i % 2 ? example[2] : example[2] + 3,
        isShown: !!(i % 2),
        time: i + 45
    }}), {})
export const Lesson = ({ lesson, columns, students }) => {
    return (
        <div
             style={{ height: (lesson.length + 1) * 41 + 19, width: '100%', maxWidth: '880px', marginBottom: '50px' }}
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
        </div>
    )
}