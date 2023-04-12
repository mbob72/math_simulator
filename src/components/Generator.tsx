import React, {useContext, useState} from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {PresetsContext} from "@/components/presets.context";
import {Preset} from "@/components/Preset";
import {Example} from "@/components/Example";

export const Generator = ({ list, current }) => {
    const {
        min,
        max,
        action,
        setMin,
        setMax,
        setAction,
        makePreset,
        examples,
        generate,
        setNum1, setNum2, _setAction, deleteExample
    } = useContext(PresetsContext);

    return (
        <>
            <h3 >Please choose preset</h3>
            <Preset
                values={{
                    min,
                    max,
                    action
                }}
                handlers={{
                    setMin,
                    setMax,
                    setAction
                }}
                makePreset={makePreset}
            />
            <Button onClick={generate} >Generate</Button>
            {examples.length && examples.map((a, i) => {
                console.log(a)
                const [mn1, mn2, res, action] = a;
                return (
                    <Example key={i} {...{ num1: mn1, num2: mn2, action, result: res, setNum1: setNum1(i), setNum2: setNum2(i), setAction: _setAction(i), deleteExample: deleteExample(i) }} />
                )
            })
            }
        </>


    )
}