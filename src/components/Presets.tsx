import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, {useContext, useState} from "react";
import {usePresets} from "@/components/preset.hooks";
import {Preset} from "@/components/Preset";
import {PresetsContext} from "@/components/presets.context";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Presets = () => {

    const {
        deleteItem,
        setIMin,
        setIMax,
        setIUp,
        setIAction,
        list
    } = useContext(PresetsContext);

    return (
        <>
            <h1>Preset</h1>
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