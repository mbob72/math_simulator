import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Presets} from "@/components/Presets";
import {PresetsWrapper} from "@/components/presets.context";
import {Generator} from "@/components/Generator";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Home() {
    return (
        <PresetsWrapper >
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Presets />
                </Grid>
                <Grid xs={12} md={4}>
                    <Generator />
                </Grid>
                <Grid xs={12} md={4}>
                    <Item>Lessons</Item>
                </Grid>
            </Grid>
        </PresetsWrapper>
    )
}