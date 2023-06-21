import React from 'react';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const theme = createTheme({
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: 'blue',
                color: 'lightgray',
                border: '1px solid red',
            },
            outlined: {
                border: '1px solid green',
                backgroundColor: 'gray',
                margin: '0 10px'
            },
        },
        MuiInput: {
            root: {
                width: 45,
                '& .MuiSelect-nativeInput': {
                    width: 20
                }
            }
        },
    },
    props: {
        MuiButton: {
            variant: 'outlined',
            size: 'large',
        },
    },

});


