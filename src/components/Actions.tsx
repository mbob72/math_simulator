import React, {useEffect, useState} from "react";
import {MenuItem} from "@mui/material";
import {ActionInput} from "@/components/ui-lib/ActionInput";

const currencies = [
    {
        value: '+',
        label: '+',
    },
    {
        value: '-',
        label: '-',
    },
    {
        value: '/',
        label: '/',
    },
    {
        value: '*',
        label: '*',
    },
];

export type ActionsType = '+' | '-' | '*' | '/'

export const Actions = ({ action = '+', setAction = (_a: ActionsType) => { } }) => {
    const [act, setAct] = useState(action);
    useEffect(() => {
        setAct(action);
    }, [action])

    return (
        <ActionInput
            select
            label="do"
            value={act}
            onChange={(e) => {setAction(e.target.value as ActionsType); setAct(e.target.value)}}
            helperText=""
        >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </ActionInput>
    )
}