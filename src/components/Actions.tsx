import {MenuItem, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

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
export const Actions = ({ action = '+', setAction }) => {
    const [act, setAct] = useState(action);
    useEffect(() => {
        setAct(action);
    }, [action])

    return (
        <TextField
            id="outlined-select-currency"
            select
            label="Action"
            value={act}
            onChange={(e) => {setAction(e.target.value); setAct(e.target.value)}}
            helperText=""
        >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}