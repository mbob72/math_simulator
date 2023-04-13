import React, {useContext, useState} from "react";
import {PresetsContext} from "@/components/presets.context";

export const Lesson = () => {
    const {
        lesson
    } = useContext(PresetsContext);

    return (
        <>
            <h3 >Current lesson</h3>
            {lesson.length && lesson.map(({ example: [a, b, res, act], status }, i) => {
                return (
                    <div key={i}>
                        <span>{a}</span> <span>{act}</span> <span>{b}</span> <span>=</span> <span>?</span>
                    </div>
                )
            })}
        </>
    )
}