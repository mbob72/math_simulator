import Grid from '@mui/material/Unstable_Grid2';
import {Presets} from "@/components/Presets";
import {StateWrapper} from "@/components/stateContext";
import {Generator} from "@/components/Generator";
import {Lessons} from "@/components/Lessons";
import {Students} from "@/components/Students";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "ag-grid-enterprise";

export default function Home() {
    return (
        <StateWrapper >
            <Grid container spacing={2}>
                <Grid xs={12} md={8}>
                    <Lessons />
                </Grid>
                <Grid xs={12} md={4}>
                    <Students />
                </Grid>
                <Grid xs={12} md={4}>
                    <Presets />
                </Grid>
                <Grid xs={12} md={4}>
                    <Generator />
                </Grid>
            </Grid>
        </StateWrapper>
    )
}