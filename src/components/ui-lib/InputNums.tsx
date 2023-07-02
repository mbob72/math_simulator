import {TextField, TextFieldProps} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";


export const InputNums = styled((props: TextFieldProps & { success: boolean }) => {
    return (
        <TextField
            variant={'standard'}
            inputProps={{ role: 'textbox' }}
            {...props}
        />
    )
})(({error, success, theme}) => ({
    width: 30,
    '& .MuiInputBase-root': {
        width: 30,
        fontSize: '1.3em'
    },
    '& .Mui-error.MuiInputBase-root .MuiInputBase-input, & .MuiInputBase-input.MuiInputBase-input': {
        textAlign: 'center',
        color: success && theme.palette.success.main || error && theme.palette.error.main,
        '-webkit-text-fill-color': success && theme.palette.success.main,
        padding: '2px 0'
    },
    '& .Mui-focused .MuiInputBase-input': {
        color: theme.palette.primary.main,
    },
    '& .MuiInput-root:after': {
        borderBottomColor: success && theme.palette.success.main
    },
    '& .MuiInputBase-root.MuiInput-root:before': {
        borderBottomColor: success && theme.palette.success.main,
        borderBottomStyle: 'solid'
    },
    '& .MuiInputLabel-root': {
        textAlign: 'center',
        left: '50%',
        transform: 'translate(-37%, 0) scale(0.75);',
        color: success && theme.palette.success.main
    },
    '& .MuiFormHelperText-root': {
        position: 'absolute',
        top: 50,
        width: 150,
        left: '50%',
        transform: 'translate(-50%)',
        textAlign: 'center'
    },

    //hide arrows for type number
    '& input[type=number]': {
        '-moz-appearance': 'textfield'
    },

    '& input[type = number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type = number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    }
}))


