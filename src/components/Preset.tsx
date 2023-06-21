import React, {ChangeEvent, EventHandler} from "react";
import TextField from '@mui/material/TextField';
import {Actions, ActionsType} from "@/components/Actions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import {InputNums} from "@/components/ui-lib/InputNums";
import Grid from "@mui/material/Unstable_Grid2";
import {ClickAwayListener} from "@mui/material";


export type GenerateComp = { min: number; max: number; action: string }
type PresetCase = { makePreset: () => {} }
type PlaneCase = { deleteItem: (a: number) => {}; num: number; setUp: (a: number) => {}; }
type ValsHandlers = {
    values: GenerateComp;
    handlers: {
        setAction:  { (event: ActionsType): void } ;
        setMin: { (event: ChangeEvent<HTMLInputElement>): void };
        setMax: { (event: ChangeEvent<HTMLInputElement>): void }
    }
};
type PresetProps1 = ValsHandlers & PresetCase;
type PresetProps2 = ValsHandlers & PlaneCase;

function isPresetCase(a: PresetCase | PlaneCase): a is PresetCase {
    return !!(a as PresetCase).makePreset;
}

export const Preset = ({ values, handlers, ...rest }: PresetProps1 | PresetProps2) => {
    return (
        <div className={'grid grid-flow-col grid-cols-[repeat(6,60px)] items-center justify-center text-center m-2'}>
                <Actions action={values.action} setAction={handlers.setAction as unknown as (event: ActionsType) => { }}/>

                <InputNums label="Min"  value={values.min}
                           onChange={handlers.setMin}/>
                <Grid >
                <InputNums label="Max"  value={values.max}
                           onChange={handlers.setMax}/>
                </Grid>

                {(isPresetCase(rest))
                    ? <ControlPointIcon className={'col-start-5 col-end-5'} onClick={rest.makePreset}/>
                    : <><div className={'col-start-1 col-end-1 text-center'}> {rest.num}</div>
                        <WifiProtectedSetupIcon onClick={() => {
                            rest.setUp(rest.num);
                        }}/>
                        <DeleteForeverIcon onClick={() => {
                            rest.deleteItem(rest.num);
                        }} />
                    </>
                }
        </div>
    )
}

