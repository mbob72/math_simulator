import {useState} from "react";


export const useExamples = () => {
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

    const setIUp = (i) => {
        const { min, max, action } = list[i];
        _setMin(min);
        _setMax(max);
        _setAction(action);
    }

    const [examples,setExamples] = useState([])

    const makeRes = (mn1, mn2, action) => {
        let res ;
        switch (action) {
            case '+':
                res = mn1 + mn2;
                break;
            case '-':
                res = mn1 - mn2;
                break;
            case '*':
                res = mn1 * mn2;
                break;
            case '/':
                res = mn1 / mn2;
                break;
        }
        return [mn1, mn2, res, action];
    }

    const generate = () => {
        const arg1 = new Array(3).fill(0).map((item, ind) => min + ind);
        const arg2 = new Array(3).fill(0).map((item, ind) => max - ind);


        for(const mn1 of arg1) {
            for(const mn2 of arg2) {
                setExamples(examples => [...examples, makeRes(mn1, mn2,  action)]);
            }
        }
    }

    const setNum1 = i => ( { target: { value: aa }}) => {
        const [_a, b, _, action] = examples[i];
        setExamples(exs => {
            exs.splice(i, 1, makeRes(aa, b, action));
            return [...exs];
        });
    }
    const setNum2 = i => ( { target: { value: bb }})=> {
        const [a, _b, _, action] = examples[i];
        setExamples(exs => {
            exs.splice(i, 1, makeRes(a, bb, action));
            return [...exs];
        });
    }
    const __setAction = i => ( aaction ) => {
        const [a, b, _, _action] = examples[i];
        setExamples(exs => {
            exs.splice(i, 1, makeRes(a, b, aaction));
            return [...exs];
        });
    }
    const deleteExample = i => () => {
        setExamples(exs => [...exs.slice(0, i), ...exs.slice(i +1)])
    }

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
        setIUp,
        generate,
        examples,
        list,
        setNum1, setNum2, _setAction: __setAction, deleteExample
    }
}

function hash({ min, max, action }) {
    return `${min}${max}${action}`
}

