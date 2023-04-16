import {useState} from "react";

export const useLessons = (examples) => {
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

    const [lessons, setLesson] = useState([]);
    const startLesson = () => {
        setLesson(lessons.concat([examples.map((example, i) => ({
            example,
            status: {
                id: i,
                shown: false,
                done: false,
                correct: false
            }
        }))]))
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

    return {
        startLesson,
        lessons,
        students,
        setInLesson
    }
}

