import React, {useContext} from "react";
import {Button} from "@mui/material";
import {PresetsContext} from "@/components/presets.context";
import {Example} from "@/components/Example";

export const Generator = () => {
    const {
        examples,
        generate,
        setNum1, setNum2, _setAction, deleteExample,
        startLesson
    } = useContext(PresetsContext);

    return (
        <>
            <Button onClick={generate} >Generate</Button>
            {examples.length && (<Button onClick={startLesson}>Produce new lesson</Button>)}
            {examples.length && examples.map((a, i) => {
                const [mn1, mn2, res, action] = a;
                return (
                    <Example key={i} {...{ num1: mn1, num2: mn2, action, result: res, setNum1: setNum1(i), setNum2: setNum2(i), setAction: _setAction(i), deleteExample: deleteExample(i) }} />
                )
            })
            }
        </>
    )
}