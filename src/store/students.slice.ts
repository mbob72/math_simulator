import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/index";

export const studentsSlice = createSlice({
    name: 'students',
    initialState: [{
        name: 'Anna',
        inLesson: false,
        correctAnswers: 0,
        wrongAnswers: 0,
        done: false
    }, {
        name: 'Mike',
        inLesson: false,
        correctAnswers: 0,
        wrongAnswers: 0,
        done: false
    }, {
        name: 'Olga',
        inLesson: false,
        correctAnswers: 0,
        wrongAnswers: 0,
        done: false
    }] as Student[],
    reducers: {
        setInLesson(students, { payload: { name: _name, val }})  {
            const theStudent = students.find(({ name }) => name === _name)
            if(theStudent.inLesson !== val) {
                theStudent.inLesson = val
            }
        }
    }
})

export const studentsSelector = (store: RootState) => store.students

export type Student = {
    name: string,
    inLesson: boolean,
    correctAnswers: number,
    wrongAnswers: number,
    done: boolean
}