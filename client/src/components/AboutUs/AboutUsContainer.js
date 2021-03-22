import React from 'react'
import { Grid } from '@material-ui/core'
import AboutUs from './AboutUs'

const AboutUsContainer = () => {
    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={false} sm={1} xl={2} />
                <Grid item container xs={12} sm={10} xl={8} style={{ margin: "32px 0px" }}>
                    <AboutUs />
                </Grid>
                <Grid item xs={false} sm={1} xl={2} />
            </Grid>
        </Grid>
    )
}

export default AboutUsContainer
