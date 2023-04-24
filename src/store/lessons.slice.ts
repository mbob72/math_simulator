import {createSlice} from "@reduxjs/toolkit";
import { createSelector } from '@reduxjs/toolkit'
import {Example} from "@/store/examples.slice";
import {RootState} from "@/store/index";

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState: [] as LessonLive[],
    reducers: {
        createLesson(lessons, {payload: { examples, students }} ) {
            const newLesson: LessonLive = {
                id: new Date().valueOf(),
                liveExamples: examples.map((example, i) => ({
                    example,
                    status: {
                        id: i,
                        shown: false,
                        done: false,
                        correct: false
                    }
                })),
                lessonStatus: {
                    status: 'setup',
                    students: students.map(({ name }) => ({
                        name,
                        status: 'checkIn'
                    })),
                }
            }
            lessons.push(newLesson)
        },
        studentInLessonChange(lessons, { payload: { idLesson, studentName }} )  {
            const student = lessons[idLesson].lessonStatus.students.find(st => st.name === studentName);
            student.status = student.status === 'checkOut' ? 'checkIn' : 'checkOut'
        },
        lunchLesson(lessons, { payload: id }) {
            const lesson = lessons[id];
            lesson.lessonStatus.status = 'inProgress';
            lesson.lessonStatus.students = lesson.lessonStatus.students.map((student) => student.status === 'checkIn'
                ? {
                    ...student,
                    status: 'started'
                } : student)
        },
        handleChangeAll(lessons, { payload: { ind, allStudentsChecked }}) {
            const lesson = lessons[ind]
            if(allStudentsChecked)
                lesson.lessonStatus.students = lesson.lessonStatus.students.map(a => ({ ...a, status: 'checkOut'}));
            else
                lesson.lessonStatus.students = lesson.lessonStatus.students.map(a => ({ ...a, status: 'checkIn'}));
        }
    }
})

export type ExampleStatus = {
    id: number,
    shown: boolean,
    done: boolean,
    correct: boolean
}

export type LessonStatus = {
    status: 'setup' | 'inProgress' | 'break' | 'done',
    students: {name: string, status: 'checkOut' | 'checkIn' | 'started' | 'done' | 'timeOut'}[]
}

export type LessonLive = {
    id: number;
    liveExamples: LiveExample[];
    lessonStatus: LessonStatus;
}
export type LiveExample = { example: Example; status: ExampleStatus }

export const selectLesson = (store: RootState, id) => {
    return store.lessons[id]
}
const selectStudent = (store, _, name) => name

export const selectLessonsSelector = (store: RootState) => store.lessons

export const allStudentsCheckedSelector = createSelector(
    [selectLesson],
    (lesson: LessonLive) => {
        return lesson?.lessonStatus.students.every(st => st.status !== 'checkOut')
    }
)
export const allStudentsUnCheckedSelector =  createSelector(
    [selectLesson],
    (lesson: LessonLive) => lesson?.lessonStatus.students.every(st => st.status === 'checkOut')
    )
export const mixStudentsCheckedSelector = createSelector(
    [allStudentsCheckedSelector, allStudentsUnCheckedSelector],
    (allChecked, allUnchecked) =>  !allChecked && !allUnchecked
)

export let studentCheckedSelector: any;
studentCheckedSelector = createSelector(
    [selectLesson,
    selectStudent],
    (lesson: LessonLive, name) =>
        lesson.lessonStatus.students.find(st => st.name === name).status !== 'checkOut'
);