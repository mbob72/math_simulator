import {useEffect, useState} from "react";
import {LiveExample} from "@/store/lessons.slice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const StudentLesson = () => {
    const [currentExamples, setCurrentExamples] = useState([])

    useEffect(() => {
        let timer = setInterval(() => {
            let statuses = localStorage.getItem('statuses');
            statuses = statuses ? JSON.parse(statuses) : null;
            let activeId = null;
            if(statuses) {
                for(const key in statuses) {
                    if (statuses[key] === 'inProgress') {
                        activeId = key;
                        break;
                    }
                }
            }
            if(activeId) {
                setCurrentExamples(JSON.parse(localStorage.getItem('lessons'))[activeId])
            }
        }, 500)

        return () => clearInterval(timer);

    }, [])
    return (
        <div className={'grid grid-cols-1 justify-center items-center m-4'}>
            <h3 className={'text-center m-4'}>Examples</h3>
            {currentExamples.length && currentExamples.map(({ example: [mn1, mn2, res, action] }: LiveExample, ind) =>
                <li key={ind} className={'grid grid-flow-col grid-cols-[repeat(4,40px)] items-baseline justify-center text-center m-2'} >
                    <span>{mn1}</span> <span>{action}</span> <span>{mn2}</span> = <TextField className={'w-16'} label={'Answer'}/> <Button >Ok</Button>
                </li>)
            }

        </div>
    )
}