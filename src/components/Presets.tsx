import React, {ChangeEvent} from "react";
import {Preset} from "@/components/Preset";
import {useAppDispatch, useAppSelector} from "@/store";
import {currentPresets, generatorPresetSlice} from "@/store/generatorPreset.slice";
import {Typography} from "@mui/material/";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {ActionsType} from "@/components/Actions";

const { actions } = generatorPresetSlice;

export const Presets = () => {
    const {
        min,
        max,
        action,
        list
    } = useAppSelector(currentPresets);
    const dispatch = useAppDispatch();

    return (
        <>
            <Typography variant={'h4'} className={'text-center mb-8'} >Generator preset</Typography>
            <Preset
                values={{
                    min,
                    max,
                    action
                }}
                handlers={{
                    setAction: (action) => { dispatch(actions.setAction(action))},
                    setMin({ target: { value: min }}) { dispatch(actions.setMin(min))},
                    setMax({ target: { value: max }}) { dispatch(actions.setMax(max))},
                }}
                makePreset={() => dispatch(actions.makePreset({ min, max, action }))}
            />
            {list.length && <Typography variant={'h5'} className={'text-center m-8'} >Presets</Typography> || null}
            {list.length &&
                list.map(({
                              min,
                              max,
                              action,
                              name,
                                hash
                          }, i) => {
                    const setIMin = (ind: number) => ({ target: { value: val }}: ChangeEvent<HTMLInputElement>) => dispatch(actions.setMinInList({ ind, val }))
                    const setIMax = (ind: number) => ({ target: { value: val }}: ChangeEvent<HTMLInputElement>) => dispatch(actions.setMaxInList({ ind, val }))
                    const setIAction = (ind: number) => (val: ActionsType) => dispatch(actions.setMaxInList({ ind, val }))
                    const deleteItem = (hash: string) => () => dispatch(actions.deleteItem(hash))
                    const setIUp = (hash: string) => () => dispatch(actions.setUp(hash))
                    return (
                        <Preset
                            key={hash}
                            values={{
                                min,
                                max,
                                action
                            }}
                            handlers={{
                                setMin: setIMin(i),
                                setMax: setIMax(i),
                                setAction: (setIAction(i))
                            }}
                            num={i}
                            deleteItem={deleteItem(hash)}
                            setUp={setIUp(hash)}
                        />
                    )
                }) || null}
            </>

    )
}