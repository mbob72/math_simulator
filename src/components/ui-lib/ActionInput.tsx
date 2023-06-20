import {makeStyles} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            width: 20
        },
        '& .MuiSelect-icon': {
          display: 'none'
        },
        '& .MuiSelect-select.MuiSelect-select.MuiSelect-select': {
            paddingRight: 0
        },
        '& .MuiInputLabel-root': {
            textAlign: 'center',
            left: '50%',
            transform: 'translate(-40%, 0) scale(0.75)'
        }
    },
});

export const ActionInput = (props: TextFieldProps) => {
    const classes = useStyles();
    return (
        <TextField
            classes={classes}
            {...props}
        >{props.children}</TextField>
    )
}