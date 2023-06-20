import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Actions} from "@/components/Actions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

type PresetProps = { values: unknown, handlers: any, } & ({ makePreset?: () => {} } | { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {} })
export const Preset = ({ values, handlers, makePreset, deleteItem, num, setUp }: PresetProps) => {
    return (
        <div className={'grid grid-flow-col grid-cols-[repeat(6,60px)] items-center justify-center text-center m-2'}>
            {makePreset && <span></span>}
                <Actions action={values.action} setAction={handlers.setAction}/>

                <TextField label="Min"  value={values.min}
                           onChange={handlers.setMin}/>
                <TextField label="Max"  value={values.max}
                           onChange={handlers.setMax}/>

                {makePreset
                    ? <ControlPointIcon className={'col-start-5 col-end-5'} onClick={makePreset}/>
                    : <><div className={'col-start-1 col-end-1 text-center'}> {num}</div>
                        <WifiProtectedSetupIcon onClick={() => {
                            setUp(num);
                        }}/>
                        <DeleteForeverIcon onClick={() => {
                            deleteItem(num);
                        }} />
                    </>
                }
        </div>
    )
}

