import Grid from "@mui/material/Unstable_Grid2";
import {Button, MenuItem, TextField} from "@mui/material";
import React, {useState} from "react";
import {Actions} from "@/components/Actions";

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {} })
export const Example = ({ num1, num2, action, result, setNum1, setNum2, setAction, deleteExample }) => {
    return (
        <Grid container spacing={2}>

            <Grid xs={3}>
                <TextField label="Number one" variant="outlined" value={num1} onChange={setNum1}/>
            </Grid>
            <Grid xs={3}>
                <Actions action={action} setAction={setAction}/>
            </Grid>
            <Grid xs={3}>
                <TextField label="Number two" variant="outlined" value={num2} onChange={setNum2}/>
            </Grid>
            <Grid xs={3}>
                <span>{result}</span> <Button onClick={deleteExample}>Delete</Button>
            </Grid>
        </Grid>
    )
}

