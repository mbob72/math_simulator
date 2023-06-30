import {QuestExample, QuestExampleProps} from "@/components/ui-lib/QuestExample";
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";

export type StudentLessonProps = { questExArr: QuestExampleProps[] }
export const StudentLesson = ({ questExArr }: StudentLessonProps) => {
    return (<div  className={'grid  grid-rows-[150px_1fr_70px] h-[100vh] max-h-[1000px]'}>
            <CircularProgress variant="determinate" size={100} className={'self-center justify-self-center'} value={55} />
        <div className={'grid overflow-y-scroll grid-cols-[1fr] pb-8 pt-4'}>
            {questExArr.map((qE, ind) => (
                <QuestExample {...qE} key={ind} />
            ))}
        </div>
            <Button className={'self-center justify-self-center'}>Start</Button>
    </div>
    )
}