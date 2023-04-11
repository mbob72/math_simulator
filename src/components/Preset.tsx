import Grid from "@mui/material/Unstable_Grid2";
import {Button, MenuItem, TextField} from "@mui/material";
import React, {useState} from "react";
import {Actions} from "@/components/Actions";

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number })
export const Preset = ({ values, handlers, makePreset, deleteItem, num }: PresetProps) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={3}>
                <Actions action={values.action} setAction={handlers.setAction}/>
            </Grid>

            <Grid xs={3}>
                <TextField label="Min" variant="outlined" value={values.min} onChange={handlers.setMin}/>
            </Grid>
            <Grid xs={3}>
                <TextField label="Max" variant="outlined" value={values.max} onChange={handlers.setMax}/>
            </Grid>
            <Grid xs={3}>
                {makePreset
                    ? <Button onClick={makePreset}>Make preset</Button>
                    : <div> <div>Num: {num}</div>
                        <Button onClick={() => {
                            deleteItem(num);
                        }}>Delete</Button>
                    </div>
                }
            </Grid>
        </Grid>
    )
}

