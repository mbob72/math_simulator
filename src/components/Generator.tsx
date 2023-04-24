import React from "react";
import {Button} from "@mui/material";
import {Example} from "@/components/Example";
import {examplesSelector, examplesSlice} from "@/store/examples.slice";
import {lessonsSlice} from "@/store/lessons.slice";
import {currentPresets} from "@/store/generatorPreset.slice";
import {useAppDispatch, useAppSelector} from "@/store";
import {studentsSelector} from "@/store/students.slice";

export const Generator = () => {
    const examples = useAppSelector(examplesSelector);
    const students = useAppSelector(studentsSelector)
    const { min, max, action } = useAppSelector(currentPresets);
    const dispatch = useAppDispatch();
    return (
        <>
            <Button onClick={() => dispatch(examplesSlice.actions.generateExamples({ min, max, action }))}>Generate</Button>
            {examples.length && (<Button onClick={() => dispatch(lessonsSlice.actions.createLesson({ examples, students }))}>Produce new lesson</Button>)}
            {examples.length && examples.map((a, i) => {
                const [mn1, mn2, res, action, hash] = a;
                return (
                    <Example key={i}
                             {...{ num1: mn1, num2: mn2, action, result: res, hash, ind: i }} />
                )
            })
            }
        </>
    )
}