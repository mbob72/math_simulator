import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, {useEffect, useState} from "react";
import {makeStyles, MenuItem} from "@material-ui/core";

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

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            width: 30
        }
    },
});
export const Actions = ({ action = '+', setAction }) => {
    const [act, setAct] = useState(action);
    useEffect(() => {
        setAct(action);
    }, [action])
    const { root } = useStyles();
    return (
        <TextField
            select
            label="Do"
            value={act}

            classes={{
                root
            }}
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