import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Actions} from "@/components/Actions";
import {useAppDispatch} from "@/store";
import { examplesSlice } from "@/store/examples.slice";

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {} })
export const Example = ({ num1, num2, action, result, hash, ind  }) => {
    const dispatch = useAppDispatch();
    return (
        <div className={'grid grid-flow-col grid-cols-[repeat(5,60px)] items-center justify-center text-center m-2'}>
            <Grid xs={3}>
                <TextField label="a"  value={num1}
                           onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit1({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <Actions action={action} setAction={val => dispatch(examplesSlice.actions.editAction({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <TextField label="b"  value={num2}
                           onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit2({ ind, val }))}/>
            </Grid>
            <div>= {result}</div>
            <Button
             onClick={() => dispatch(examplesSlice.actions.deleteExample({ uuid: hash }))}
            >Delete</Button>
        </div>
    )
}

