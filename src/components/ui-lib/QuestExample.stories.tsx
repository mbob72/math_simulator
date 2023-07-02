import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import store  from '../../store'

import {QuestExample} from "./QuestExample";
import {within, userEvent} from "@storybook/testing-library";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof QuestExample> = {
    title: 'Application/QuestExamples',
    component: QuestExample,
    tags: ['autodocs'],
    decorators: [(story) =>
        <Provider store={store}>{story()}</Provider>],
    argTypes: { checkResult: { action: 'clicked' } },
    args: {
        num1: 4,
        num2: 4,
        action: '+',
        result: 8,
        hash: 'hash',
        ind: 1,
    },
};

export default meta;
type Story = StoryObj<typeof QuestExample>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        ...meta.args
    },
};

export const Focus: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const resInput = canvas.getByRole('textbox');
        await userEvent.click(resInput);
    }
};

export const PutWrong: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const resInput = canvas.getByRole('textbox');
        await userEvent.click(resInput);
        await userEvent.type(resInput, '5');
        const okButton = canvas.getByTestId('ok-button');;
        await userEvent.click(okButton);
    }
};

export const PutWrongAndBlur: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const resInput = canvas.getByRole('textbox');
        await userEvent.click(resInput);
        await userEvent.type(resInput, '5');
        await userEvent.tab();
    }
};

export const PutAnotherWrongNotPressingOk: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // @ts-ignore
        // eslint-disable-next-line storybook/context-in-play-function
        await PutWrongAndBlur.play({ canvasElement: canvasElement! });

        const resInput = canvas.getByRole('textbox');
        await userEvent.click(resInput);
        await userEvent.type(resInput, '6');
    }
};

export const PutAnotherWrongNotPressingOkAndBlur: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // @ts-ignore
        // eslint-disable-next-line storybook/context-in-play-function
        await PutAnotherWrongNotPressingOk.play({ canvasElement: canvasElement! });

        await userEvent.tab();
    }
};
export const PutAnotherWrongAndPressingOk: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // @ts-ignore
        // eslint-disable-next-line storybook/context-in-play-function
        await PutWrongAndBlur.play({ canvasElement: canvasElement! });

        const resInput = canvas.getByRole('textbox');
        await userEvent.click(resInput);
        await userEvent.type(resInput, '6');
        const okButton = canvas.getByTestId('ok-button');;
        await userEvent.click(okButton);
    }
};


export const PutCorrectAfterWrong: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // @ts-ignore
        // eslint-disable-next-line storybook/context-in-play-function
        await PutWrong.play({ canvasElement });

        const resInput = canvas.getByRole('textbox');
        await userEvent.clear(resInput);
        await userEvent.click(resInput);
        await userEvent.type(resInput, '8');

        const okButton = canvas.getByTestId('ok-button');
        await userEvent.click(okButton);
    }
};

export const TryEditCorrectAnswer: Story = {
    args: { ...meta.args },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const resInput = canvas.getByRole('textbox');
        const okButton = canvas.getByTestId('ok-button');
        await userEvent.click(resInput);
        await userEvent.type(resInput, '8');
        await userEvent.click(okButton);

        await userEvent.click(resInput);
        await userEvent.type(resInput, '6');

        await userEvent.click(okButton);
    }
};


