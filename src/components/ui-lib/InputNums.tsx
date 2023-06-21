import TextField from "@mui/material/TextField";
import React from "react";
import {TextFieldProps} from "@mui/material";
import {styled} from "@mui/material/styles";

export const _InputNums = (props: TextFieldProps) => {
    return (
        <TextField
            variant={'standard'}
            {...props }
        />
    )
}

export const InputNums = styled(_InputNums)`
    width: 30px;
  
    & .MuiInputBase-root {
       width: 30px;
    }
    & .MuiInputBase-input {
       text-align: center
    }
    & .MuiInputLabel-root {
       text-align: center;
       left: 50%;
       transform: translate(-37%, 0) scale(0.75)
    }
`


