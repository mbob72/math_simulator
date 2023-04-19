import {useState} from "react";

export type Example = [number, number, string, number];
export type ExampleStatus = {
    id: number,
    shown: boolean,
    done: boolean,
    correct: boolean
}
export type LiveExample = { example: Example; status: ExampleStatus }

export type LessonStatus = {
        status: 'setup' | 'inProgress' | 'break' | 'done',
        students: {name: string, status: 'checkOut' | 'checkIn' | 'started' | 'done' | 'timeOut'}[]
}

export type LessonLive = {
    id: number;
    liveExamples: LiveExample[];
    lessonStatus: LessonStatus;
}

export type Student = {
    name: string,
    inLesson: boolean,
    correctAnswers: number,
    wrongAnswers: number,
    done: boolean
}
export const useLessons = (examples: Example[]) => {
    const [students, setStudents] = useState([{
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
    }]);

    const [lessons, setLessons] = useState<LessonLive[]>([] as LessonLive[]);
    const startLesson = () => {
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
        setLessons([...lessons, newLesson])
    }


    const setInLesson = (_name, val) => {
        if(students.find(({ name }) => name === _name).inLesson !== val) {
            setStudents(students => students.map((student) => student.name === _name
                ? {
                    ...student,
                    inLesson: val
                }
                : student
            ))
        }
    }

    const studentChecked = (name, lesson: LessonLive) => lesson.lessonStatus.students.find(st => st.name === name).status !== 'checkOut'
    const studentChange = (name, lesson: LessonLive) => () => {
        const student = lesson.lessonStatus.students.find(st => st.name === name);
        student.status = student.status === 'checkOut' ? 'checkIn' : 'checkOut'
        setLessons(lessons =>  [...lessons])
    }
    const lunchLesson = (lesson: LessonLive) => () => {
        lesson.lessonStatus.status = 'inProgress';
        lesson.lessonStatus.students = lesson.lessonStatus.students.map((student) => student.status === 'checkIn'
            ? {
            ...student,
            status: 'started'
        } : student)
        setLessons(lessons =>  [...lessons])
    }

    const allStudentsChecked = (lesson: LessonLive) => {
        return lesson.lessonStatus.students.every(st => st.status !== 'checkOut')
    }

    const allStudentsUnChecked = (lesson: LessonLive) => {
        return lesson.lessonStatus.students.every(st => st.status === 'checkOut')
    }
    const mixStudentsChecked = (lesson: LessonLive) =>  (!allStudentsChecked(lesson) && !allStudentsUnChecked(lesson))

    const handleChangeAdd = (lesson: LessonLive) => () => {
        if(allStudentsChecked(lesson))
            lesson.lessonStatus.students = lesson.lessonStatus.students.map(a => ({ ...a, status: 'checkOut'}));
        else
            lesson.lessonStatus.students = lesson.lessonStatus.students.map(a => ({ ...a, status: 'checkIn'}));
        setLessons( [...lessons])
    }

    return {
        startLesson,
        lessons,
        students,
        setInLesson,
        studentChecked, studentChange,
        lunchLesson,
        allStudentsChecked, mixStudentsChecked, handleChangeAdd
    }
}

