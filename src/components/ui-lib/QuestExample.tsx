import {InputNums} from "@/components/ui-lib/InputNums";
import {ActionsType} from "@/components/Actions";
import { CheckCircleOutline } from "@mui/icons-material";
import React, {useCallback, useMemo, useState} from "react";
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

export type QuestExampleProps = {
    num1: string | number, num2: string | number,
    action: ActionsType, result: string | number, hash: string, ind: number;
    checkResult: (a: { isCorrect: boolean; value?: string; hash: string }) => void;
};

export const QuestExample = ({num1, num2, action, result, hash, ind, checkResult }: QuestExampleProps) => {
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const name = useMemo(() => `result_${ind}`, [ind, hash]);
    const {
        control,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [name]: '',
        }
    });
    const value = watch(name);

    const putRes = useCallback(async () => {
        if(result == value) {
            setSuccess(true);
            setDisabled(true);
            checkResult({ isCorrect: true, hash });
            return;
        }
        setError(name, { message: ' '})
        checkResult({ isCorrect: false, value, hash });
    }, [value, handleSubmit, name, setError, setValue, setSuccess])

    const theme = useTheme();

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
                        onChange={(e) => {
                            if(e.target.value != value) {
                                clearErrors(name);
                            }
                            onChange(e);
                        }}
                        value={value}
                    />)}
                />
               <CheckCircleOutline
                    className={'justify-self-end cursor-pointer'}
                    color={errors[name] && 'error' || success && 'success' || 'inherit'}
                    onClick={putRes}
                />
            </div>
        </form>
    )
}