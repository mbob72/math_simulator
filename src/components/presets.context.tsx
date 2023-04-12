import React from 'react';
import {usePresets} from "@/components/preset.hooks";
export const PresetsContext = React.createContext();

export function PresetsWrapper({ children }) {
    const state = usePresets();
    return (
        <PresetsContext.Provider value={state}>
            {children}
        </PresetsContext.Provider>
    )
}