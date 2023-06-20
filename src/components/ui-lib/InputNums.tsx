import TextField from "@material-ui/core/TextField";
import React from "react";
import {TextFieldProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            width: 30,
        },
        '& .MuiInputBase-input': {
            textAlign: 'center'
        },
        '& .MuiInputLabel-root': {
            textAlign: 'center',
            left: '50%',
            transform: 'translate(-50%, 0) scale(0.75)'
        }
    },
});

export const InputNums = (props: TextFieldProps) => {
    const classes = useStyles();

    return (
        <TextField
            {...props }
            classes={classes}
        />
    )
}

