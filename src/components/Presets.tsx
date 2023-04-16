import React, {useContext} from "react";
import {Preset} from "@/components/Preset";
import {StateContext} from "@/components/stateContext";

export const Presets = () => {
    const {
        min,
        max,
        action,
        setMin,
        setMax,
        setAction,
        makePreset,
        deleteItem,
        setIMin,
        setIMax,
        setIUp,
        setIAction,
        list
    } = useContext(StateContext);
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
                    setMin,
                    setMax,
                    setAction
                }}
                makePreset={makePreset}
            />
            {list.length && <h1>Presets</h1>}
            {list.length &&
                list.map(({
                              min,
                              max,
                              action,
                              name
                          }, i) => (
                    <Preset
                        key={name}
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
                        deleteItem={deleteItem}
                        setUp={setIUp}
                    />
                ))}
            </>

    )
}