import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {RootState} from "@/store/index";
import {GenerateComp} from "@/components/Preset";
export const examplesSlice = createSlice({
    name: 'examples',
    initialState: [] as Example[],
    reducers: {
        generateExamples(state, { payload : { min, max, action }}: PayloadAction<{ min: number, max: number, action: string }>) {
            generate(state, { min, max, action });
        },
        edit1(state, { payload: { ind, val } }) {
            const [_a, b, _, action, uuid] = state[ind];
            const res = makeRes(val, b, action);
            res[4] = uuid;
            state.splice(ind, 1, res);
        },
        edit2(state, { payload: { ind, val } }) {
            const [a, _b, _, action, uuid] = state[ind];
            const res = makeRes(a, val, action);
            res[4] = uuid;
            state.splice(ind, 1, res);
        },
        editAction(state, { payload: { ind, val } }) {
            console.log('edit action::', ind, val);
            const [a, b, _, _action, uuid] = state[ind];
            const res = makeRes(a, b, val);
            res[4] = uuid;
            state.splice(ind, 1, res);
            state.splice(ind, 1, res);
        },
        deleteExample(state, { payload: { uuid }}) {
            return state.filter(([, , , , _uuid]) => uuid !== _uuid )
        }
    }
})

export type Example = [number, number, number, string, string];

export const examplesSelector = (store: RootState) => store.examples

const generate = ( examples: Example[], { min, max, action }: GenerateComp) => {
    const arg1 = new Array(3).fill(0).map((item, ind) => min + ind);
    const arg2 = new Array(3).fill(0).map((item, ind) => max - ind);
    for(const mn1 of arg1) {
        for(const mn2 of arg2) {
            examples.push(makeRes(mn1, mn2,  action));
        }
    }
}
const makeRes = (mn1: number | string, mn2: number | string, action: string): Example => {
    let res: number;
    switch (action) {
        case '+':
            res = Number(mn1) + Number(mn2);
            break;
        case '-':
            res = Number(mn1) - Number(mn2);
            break;
        case '*':
            res = Number(mn1) * Number(mn2);
            break;
        case '/':
            res = Number(mn1) / Number(mn2);
            break;
        default:
            res = NaN;
    }
    return [Number(mn1), Number(mn2), res, action, uuidv4()];
}