import {TextFieldProps} from "@mui/material";
import TextField from '@mui/material/TextField';
import {styled, StyledEngineProvider} from "@mui/material/styles";
 const _ActionInput = (props: TextFieldProps) => {
    return (
        <StyledEngineProvider injectFirst>
            <TextField
                {...props}
                variant={'standard'}
            >{props.children}</TextField>
        </StyledEngineProvider>
    )
}

export const ActionInput = styled(_ActionInput)`
    
    width: 20px;

    & .MuiInputBase-root {
        width: 20px;
    }
    & .MuiSelect-icon {
      display: none;
    },
    & .MuiSelect-select.MuiSelect-select.MuiSelect-select {
        padding-right: 0;
    },
    & .MuiInputLabel-root {
        text-align: center;
        left: 50%;
        transform: translate(-37%, 0) scale(0.75);
    }
`


