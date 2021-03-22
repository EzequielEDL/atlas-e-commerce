import React from "react";
import { Button, InputLabel, Grid, Typography, Card } from "@material-ui/core";
import useStyles, { CustomTextField } from "./styles";

const ResetPasswordForm = () => {
  const classes = useStyles();

  return (
    <>
        <Grid container xs={12} justify='flex-start' alignItems='flex-start'>
            <Grid item >
              <Card className={classes.containerForm}>
              <Typography variant="h4" align='center' className={classes.title}>
               Change password
              </Typography>

                <form action="" >
                  <Grid item>
                    <InputLabel
                      color="primary"
                      required={true}
                      className={classes.input}
                    >
                      Current password
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="password"
                      type="password"
                      className={classes.textFieldSignInPassword}
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel
                      color="primary"
                      required={true}
                      className={classes.input}
                    >
                      New Password
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="password"
                      type="password"
                      className={classes.textFieldSignInPassword}
                    />
                  </Grid>
                  <Grid item container justify="center" alignItems="center">
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        classes={{ root: classes.disabled }}
                      >
                        Save changes
                      </Button>
                  </Grid>
                </form>
              </Card>
            </Grid>
        </Grid>


    </>
  );
};



export default ResetPasswordForm;
