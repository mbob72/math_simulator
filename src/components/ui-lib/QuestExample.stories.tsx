import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import store  from '../../store'

import {QuestExample} from "./QuestExample";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof QuestExample> = {
    title: 'Application/QuestExamples',
    component: QuestExample,
    tags: ['autodocs'],
    decorators: [(story) =>
        <Provider store={store}>{story()}</Provider>],
};

export default meta;
type Story = StoryObj<typeof QuestExample>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        num1: 4,
        num2: 4,
        action: '+',
        result: 8,
        hash: 'hash',
        ind: 1,
        //@ts-ignore
        checkResult: console.log
    },
};

