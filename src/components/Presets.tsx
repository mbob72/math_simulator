import React from "react";
import {Preset} from "@/components/Preset";
import {useAppDispatch, useAppSelector} from "@/store";
import {currentPresets, generatorPresetSlice} from "@/store/generatorPreset.slice";

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
            <h3 >Generator preset</h3>
            <Preset
                values={{
                    min,
                    max,
                    action
                }}
                handlers={{
                    setMin({ target: { value: min }}) { dispatch(actions.setMin(min))},
                    setMax({ target: { value: max }}) { dispatch(actions.setMax(max))},
                    setAction(action) { dispatch(actions.setAction(action))},
                }}
                makePreset={() => dispatch(actions.makePreset({ min, max, action }))}
            />
            {list.length && <h1>Presets</h1>}
            {list.length &&
                list.map(({
                              min,
                              max,
                              action,
                              name,
                                hash
                          }, i) => {
                    const setIMin = ind => ({ target: { value: val }}) => dispatch(actions.setMinInList({ ind, val }))
                    const setIMax = ind => ({ target: { value: val }}) => dispatch(actions.setMaxInList({ ind, val }))
                    const setIAction = ind => val => dispatch(actions.setMaxInList({ ind, val }))
                    const deleteItem = hash => () => dispatch(actions.deleteItem(hash))
                    const setIUp = hash => () => dispatch(actions.setUp(hash))
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
                                setAction: setIAction(i)
                            }}
                            num={i}
                            deleteItem={deleteItem(hash)}
                            setUp={setIUp(hash)}
                        />
                    )
                })}
            </>

    )
}