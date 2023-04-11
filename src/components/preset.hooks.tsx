import {useState} from "react";


export const usePresets = () => {
    const [min, _setMin] = useState(0);
    const [max, _setMax] = useState(100);
    const [action, _setAction] = useState('+')
    const setMin = ({target: {value}}) => _setMin(value)
    const setMax = ({target: {value}}) => _setMax(value)

    const setAction = (value) => _setAction(value)

    const [list, makeSetList] = useState([]);

    const makePreset = () => {
        if(list.some(({ hash: _hash}) => hash({ min, max, action}) === _hash)) return;
        makeSetList(list => list.concat({
            min,
            max,
            action,
            hash: hash({ min, max, action}),
            name: new Date().valueOf()
        }))
    }

    const deleteItem = i => makeSetList(list => list.splice(i, 1))

    const setIMin = i => min => makeSetList(list => list.map((item, j) => i === j ? { ...item, min } : item ))
    const setIMax = i => max => makeSetList(list => list.map((item, j) => i === j ? { ...item, max } : item ))
    const setIAction = i => action => makeSetList(list => list.map((item, j) => i === j ? { ...item, action } : item ))

    return {
        min,
        max,
        action,
        setMin,
        setMax,
        setAction,
        deleteItem,
        makePreset,
        setIMin,
        setIMax,
        setIAction,
        list
    }
}

function hash({ min, max, action }) {
    return `${min}${max}${action}`
}

