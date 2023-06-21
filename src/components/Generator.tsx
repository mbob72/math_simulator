import React from "react";

import Button from '@mui/material/Button';
import {Example} from "@/components/Example";
import {examplesSelector, examplesSlice} from "@/store/examples.slice";
import {lessonsSlice} from "@/store/lessons.slice";
import {currentPresets} from "@/store/generatorPreset.slice";
import {useAppDispatch, useAppSelector} from "@/store";
import {studentsSelector} from "@/store/students.slice";
import {Typography} from "@mui/material";
import {ActionsType} from "@/components/Actions";

export const Generator = () => {
    const examples = useAppSelector(examplesSelector);
    const students = useAppSelector(studentsSelector)
    const { min, max, action } = useAppSelector(currentPresets);
    const dispatch = useAppDispatch();
    return (
        <div className={'grid grid-flow-row'}>
            <Typography variant={'h4'} className={'text-center'} >Generator </Typography>
            <div className={'grid grid-flow-col grid-cols-[repeat(2,200px)] justify-evenly m-2'} >

            <Button onClick={() => dispatch(examplesSlice.actions.generateExamples({ min, max, action }))}>Generate</Button>
            {examples.length && (<Button onClick={() => dispatch(lessonsSlice.actions.createLesson({ examples, students }))}>Create lesson</Button>) || null}
            </div>
            <div className={'grid grid-flow-col grid-cols-[repeat(2,200px)] justify-evenly m-2'} >
                <Button >Add example</Button>
            </div>
            {examples.length && examples.map((a, i) => {
                const [mn1, mn2, res, action, hash] = a;
                return (
                    <Example key={i}
                             {...{ num1: mn1, num2: mn2, action: action as ActionsType, result: res, hash, ind: i }} />
                )
            }) || null
            }
        </div>
    )
}