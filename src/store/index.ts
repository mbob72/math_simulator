import {
    configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import {generatorPresetSlice} from "@/store/generatorPreset.slice";
import {examplesSlice} from "@/store/examples.slice";
import {studentsSlice} from "@/store/students.slice";
import {lessonsSlice} from "@/store/lessons.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        [generatorPresetSlice.name]: generatorPresetSlice.reducer,
        [examplesSlice.name]: examplesSlice.reducer,
        [studentsSlice.name]: studentsSlice.reducer,
        [lessonsSlice.name]: lessonsSlice.reducer
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

sagaMiddleware.run(saga);

export default store;
