import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import {Actions, ActionsType} from "@/components/Actions";
import {useAppDispatch} from "@/store";
import { examplesSlice } from "@/store/examples.slice";
import {InputNums} from "@/components/ui-lib/InputNums";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type ExampleProps = { num1: string | number, num2: string | number, action: ActionsType, result: string | number, hash: string, ind: number };
export const Example = ({ num1, num2, action, result, hash, ind  }: ExampleProps) => {
    const dispatch = useAppDispatch();
    return (
        <div className={'grid grid-flow-col grid-cols-[repeat(5,40px)] items-center justify-center text-center m-2'}>
            <Grid xs={3}>
                <InputNums label="a"  value={num1}
                           onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit1({ ind, val }))}/>
            </Grid>
            <Grid xs={3}>
                <Actions action={action} setAction={val => {
                    dispatch(examplesSlice.actions.editAction({ ind, val }))
                }}/>
            </Grid>
            <Grid xs={3}>
                <InputNums
                    label="b"
                    value={num2}
                    onChange={({ target: { value: val }}) => dispatch(examplesSlice.actions.edit2({ ind, val }))}/>
            </Grid>
            <div className={'text-center translate-y-1.5'}>= {result}</div>
            <DeleteForeverIcon
                className={'translate-y-1 justify-self-end cursor-pointer'}
                onClick={() => dispatch(examplesSlice.actions.deleteExample({ uuid: hash }))}
            />
        </div>
    )
}

