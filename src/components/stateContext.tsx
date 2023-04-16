import React from 'react';
import {useExamples} from "@/components/examples.hooks";
import {useLessons} from "@/components/lessons.hooks";
export const StateContext = React.createContext();

export function StateWrapper({ children }) {
    const examples = useExamples();
    const lessons = useLessons(examples.examples);

    return (
        <StateContext.Provider value={{ ...examples, ...lessons }}>
            {children}
        </StateContext.Provider>
    )
}