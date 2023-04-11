import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, {useState} from "react";
import {usePresets} from "@/components/preset.hooks";
import {Preset} from "@/components/Preset";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Presets = () => {

    const onChange = e => console.log(e.target.value);

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
        setIAction,
        list
    } = usePresets()

    return (
        <>
            <h1>Preset</h1>
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
                    />
                ))}
            </>

    )
}