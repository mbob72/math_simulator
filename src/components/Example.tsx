import Grid from "@mui/material/Unstable_Grid2";
import {Button, TextField} from "@mui/material";
import React from "react";
import {Actions} from "@/components/Actions";
import {useAppDispatch} from "@/store";
import { examplesSlice } from "@/store/examples.slice";

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {} })
export const Example = ({ num1, num2, action, result, hash, ind  }) => {
    const dispatch = useAppDispatch();
    return (
        <Grid container spacing={2}>
            <Grid xs={3}>
                <TextField label="Number one" variant="outlined" value={num1}
                           onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit1({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <Actions action={action} setAction={val => dispatch(examplesSlice.actions.editAction({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <TextField label="Number two" variant="outlined" value={num2}
                           onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit2({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <span>{result}</span> <Button
                onClick={() => dispatch(examplesSlice.actions.deleteExample({ uuid: hash }))}>Delete</Button>
            </Grid>
        </Grid>
    )
}

