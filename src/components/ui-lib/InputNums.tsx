import {TextField, TextFieldProps} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";


export const InputNums = styled((props: TextFieldProps & { success: boolean }) => {
    return (
        <TextField
            variant={'standard'}
            {...props}
        />
    )
})(({error, success, theme}) => ({
    width: 30,
    '& .MuiInputBase-root': {
        width: 30,
    },
    '& .MuiInputBase-input': {
        textAlign: 'center',
        color: success && theme.palette.success.main || error && theme.palette.error.main || 'unset',
        '-webkit-text-fill-color': success && theme.palette.success.main
    },
    '& .MuiInput-root:after': {
        borderBottomColor: success && theme.palette.success.main
    },
    '& .MuiInputBase-root.MuiInput-root:before': {
        borderBottomColor: success && theme.palette.success.main
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


