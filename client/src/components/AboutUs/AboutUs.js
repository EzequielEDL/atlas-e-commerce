import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import TeamCard from './TeamCard'
import team from './team'
import styleUs from './styles'

const AboutUs = () => {

    const classes = styleUs()
    
    return (
        <Grid container className={classes.container}>
            <Grid item className={classes.title}>
                <Typography className={classes.titleText}> "Individually, we are one drop. Together, we are an ocean" </Typography>
            </Grid>
            <Grid item container className={classes.containerCards}>
                {team.map(user => (
                    <TeamCard user={user} />
                ))}
            </Grid>
        </Grid>
    )
}

export default AboutUs
