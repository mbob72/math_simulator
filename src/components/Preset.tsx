import Grid from "@mui/material/Unstable_Grid2";
import {Button, TextField} from "@mui/material";
import React from "react";
import {Actions} from "@/components/Actions";

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {} })
export const Preset = ({ values, handlers, makePreset, deleteItem, num, setUp }: PresetProps) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={3}>
                <Actions action={values.action} setAction={handlers.setAction}/>
            </Grid>

            <Grid xs={3}>
                <TextField label="Min" variant="outlined" value={values.min}
                           onChange={handlers.setMin}/>
            </Grid>
            <Grid xs={3}>
                <TextField label="Max" variant="outlined" value={values.max}
                           onChange={handlers.setMax}/>
            </Grid>
            <Grid xs={3}>
                {makePreset
                    ? <Button onClick={makePreset}>Make preset</Button>
                    : <div> <div>Num: {num}</div>
                        <Button onClick={() => {
                            deleteItem(num);
                        }}>Delete</Button>
                        <Button onClick={() => {
                            setUp(num);
                        }}>Set Up</Button>
                    </div>
                }
            </Grid>
        </Grid>
    )
}

