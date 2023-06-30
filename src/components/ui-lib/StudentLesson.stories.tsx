import {Meta, StoryObj} from "@storybook/react";
import {QuestExample} from "@/components/ui-lib/QuestExample";
import {Provider} from "react-redux";
import store from "@/store";
import {StudentLesson} from "@/components/ui-lib/StudentLesson";

const meta: Meta<typeof StudentLesson> = {
    title: 'Application/QuestExamplesList',
    component: StudentLesson,
    tags: ['autodocs'],
    decorators: [(story) =>
        <Provider store={store}>{story()}</Provider>],
};

export default meta;
type Story = StoryObj<typeof StudentLesson>;

export const Primary: Story = {
    args: {
        questExArr: [{
            num1: 4,
            num2: 4,
            action: '+',
            result: 8,
            hash: 'hash',
            ind: 1,
            //@ts-ignore
            checkResult: console.log
        }, {
            num1: 4,
            num2: 4,
            action: '+',
            result: 8,
            hash: 'hash2',
            ind: 2,
            //@ts-ignore
            checkResult: console.log
        }, {
            num1: 4,
            num2: 4,
            action: '+',
            result: 8,
            hash: 'hash2',
            ind: 3,
            //@ts-ignore
            checkResult: console.log
        }, {
            num1: 4,
            num2: 4,
            action: '+',
            result: 8,
            hash: 'hash4',
            ind: 14,
            //@ts-ignore
            checkResult: console.log
        },
            {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash5',
                ind: 15,
                //@ts-ignore
                checkResult: console.log
            }, {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash',
                ind: 1,
                //@ts-ignore
                checkResult: console.log
            }, {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash2',
                ind: 2,
                //@ts-ignore
                checkResult: console.log
            }, {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash2',
                ind: 3,
                //@ts-ignore
                checkResult: console.log
            }, {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash4',
                ind: 14,
                //@ts-ignore
                checkResult: console.log
            },
            {
                num1: 4,
                num2: 4,
                action: '+',
                result: 8,
                hash: 'hash5',
                ind: 15,
                //@ts-ignore
                checkResult: console.log
            }]
    }
};