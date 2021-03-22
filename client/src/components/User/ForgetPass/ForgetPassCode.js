import React from "react";
import { Grid, Paper } from  '@material-ui/core';

const ForgetPassCode = ({ handleSubmitCode, handleChangeInput }) => {

  return (
    <Grid item container xs={6}>
      <Grid item>
        <Paper>
          <form >
            <input name="inputCode" onChange={handleChangeInput}/>
            <button type="submit">ENVIAR</button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default ForgetPassCode;