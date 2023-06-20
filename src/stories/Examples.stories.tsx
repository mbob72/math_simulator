import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import store  from '../store'

import { Button } from './Button';
import {Example} from "../components/Example";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Example> = {
    title: 'Application/Examples',
    component: Example,
    tags: ['autodocs'],
    decorators: [(story) =>
        <Provider store={store}>{story()}</Provider>],
};

export default meta;
type Story = StoryObj<typeof Example>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        num1: 2,
        num2: 4,
        action: '+',
        result: 6,
        hash: 'kjlkjl',
        ind: 4
    },
};

