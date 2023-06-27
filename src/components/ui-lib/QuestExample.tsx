import {useAppDispatch} from "@/store";
import Grid from "@mui/material/Unstable_Grid2";
import {InputNums} from "@/components/ui-lib/InputNums";
import {examplesSlice} from "@/store/examples.slice";
import {Actions, ActionsType} from "@/components/Actions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React, {useCallback, useMemo, useState} from "react";
import { useForm, Controller } from 'react-hook-form';

type QuestExampleProps = {
    num1: string | number, num2: string | number,
    action: ActionsType, result: string | number, hash: string, ind: number,
    checkResult: (res: string, hash: string) => {},
};

export const QuestExample = ({num1, num2, action, result, hash, ind, checkResult}: QuestExampleProps) => {
    const dispatch = useAppDispatch();
    const [res, setRes] = useState('');
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const name = useMemo(() => `result_${ind}`, [ind, hash]);
    const {
        register,
        control,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        setValue,
        setFocus,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [name]: '',
        }
    });
    const value = watch(name);

    const putRes = useCallback(async () => {
        await new Promise(res => setTimeout(res, 2000));
        if(result == value) {
            setSuccess(true);
            setDisabled(true);
            return;
        }
        setError(name, { message: ' '})
        await new Promise(res => setTimeout(res, 5000));
        setValue(name, '');
        clearErrors(name);
    }, [value, handleSubmit, name, setError, setValue, setSuccess])

    return (
        <form>
            <div
                className={'grid grid-flow-col grid-cols-[repeat(4,20px)_30px_40px] items-center justify-center text-center m-2'}>
                <div>{num1}</div>
                <div>{action}</div>
                <div>{num2}</div>
                <div>=</div>
                <Controller
                    name={name}
                    control={control}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                                 formState,
                             }) => (
                    <InputNums
                        className={'-translate-y-1.5'}
                        label="res"
                        type="number"
                        success={success}
                        autoComplete={'off'}
                        helperText={error ? error.message : null}
                        error={!!error}
                        disabled={disabled}
                        onChange={onChange}
                        value={value}
                    />)}
                />
                <ThumbUpIcon
                    className={'justify-self-end cursor-pointer -scale-x-100 '}
                    onClick={putRes}
                />
            </div>
        </form>
    )
}