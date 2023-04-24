import {
    createSlice,
} from '@reduxjs/toolkit'
import {hash} from "@/store/lib";
import {RootState} from "@/store/index";

function updateItemInArray(state, ind, val, propName) {
    const newItem = {
        ...state[ind],
        [propName]: val
    };
    const newHash = hash(newItem);

    if([...state, { ...newItem, hash: newHash }].reduce((memo, { hash }) => memo + Number(hash === newHash), 0) > 1) return;
    state[ind] = {
        ...newItem,
        hash: newHash,
    }
}

export const generatorPresetSlice = createSlice({
    name: 'generatorPreset',
    initialState: {
        min: 0,
        max: 10,
        action: '+',
        list: []
    },
    reducers: {
        setMinInList({ list }, { payload: { ind, val }}) {
            updateItemInArray(list, ind, val, 'min')
        },
        setMaxInList({ list }, { payload: { ind, val }}) {
            updateItemInArray(list, ind, val, 'max')
        },
        setActionInList({ list }, { payload: { ind, val }}) {
            updateItemInArray(list, ind, val, 'action')
        },
        deleteItem(state, { payload: hashToDelete }) {
            state.list = state.list.filter(({ hash }) => hash !== hashToDelete)
        },
        setUp(state, { payload: hash1 }) {
            const newItem = state.list.find(({ hash }) => hash === hash1)
            state.min = newItem.min;
            state.max = newItem.max;
            state.acton = newItem.acton;
        },
        makePreset({ list }, { payload: { min, max, action }}) {
            if(list.some(({ hash: _hash}) => hash({ min, max, action}) === _hash)) return;
            list.push({
                min,
                max,
                action,
                hash: hash({ min, max, action })
            })
        },
        setMin(state, { payload: min }) {
            console.log('have min', min)
            state.min = min;
        },
        setMax(state,  { payload: max }) {
            state.max = max;
        },
        setAction(state, { payload: action }) {
            state.action = action;
        },
    }
})

export const currentPresets = (store: RootState) => store.generatorPreset

