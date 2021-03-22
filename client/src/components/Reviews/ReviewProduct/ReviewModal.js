import React, {  useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Avatar,
  TextField
} from "@material-ui/core";
import { StarFullIcon } from '../../SvgIcons/IconsMaterial';
import useStyles from "./styles.js";


const ReviewModal = ({ init, handleClose, handleFinalSubmit}) => {
  const classes = useStyles();
  const [input, setInput] = useState(!!init.review ? init.review : {
    score: 0,
    description: ""
  });
  const [errors, setErrors] = useState({
    score: "",
    description: "",
  });

  const handleInputChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const handleScore = event => {
    if (input.score > 0) document.getElementById(input.score).checked = false;
    if (event.target.checked) setInput({...input, [event.target.name]: event.target.id})
  }

  const validations = (formInput) => {
    let errors = {
      score: "",
      description: "",
    };
    if (formInput.score < 1) errors.score = "Score is required";
    if (!formInput.description) errors.description = "Description is required";
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validations({
      ...input,
      [event.target.name]: event.target.value
    }));

    if(errors.score === "" && errors.description === "") {
      handleFinalSubmit(input)
      handleClose();
    }
  }

  const ContentMid = (
    <Grid item container xs={12} direction="row" style={{margin: "auto"}} spacing={2}>
      <Grid item>
        <Avatar
          alt="https://i.ibb.co/nbypcHd/default-avatar.jpg"
          sizes="24"
          className={classes.avatar}
        >
          {init.userName[0].toUpperCase()}
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" styles={{padding: "0px"}}>{init.userName}</Typography>
        <Typography variant="caption" styles={{padding: "0px"}}>Your review will be posted publicly on the web.</Typography>
      </Grid>
    </Grid>
  );

  const ContentDown = (
    <Grid item container xs={12} direction="row" style={{margin: "auto"}}>
      <form onSubmit={handleSubmit} className={classes.formControl} style={{margin: "auto"}}>
        <Grid item container spacing={1} direction="row" style={{margin: "auto"}}>
          {[1, 2, 3, 4, 5].map((score, index) => (
              <Grid item key={index} >
                  <input
                      style={{display: "none"}}
                      id={score}
                      type="checkbox"
                      onChange={handleScore}
                      name="score"
                  />
                  <label htmlFor={score}>
                    <StarFullIcon
                      fontSize="large"
                      className={classes.starSelect}
                      color={
                        input.score >= score ? "secondary" : "inherit"
                      }
                    />
                  </label>
              </Grid>
            ))
          }
        </Grid>

        <Grid item container xs={12} spacing={1} style={{margin: "auto"}}>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              variant='outlined'
              multiline
              rows={4}
              type="text"
              name="description"
              value={input.description}
              error={!!errors.description}
              onChange={handleInputChange}
              placeholder="Your review"
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={1} justify="flex-end" style={{margin: "auto"}}>
        <Grid item>
          <Button onClick={handleClose} variant='text' color='primary'>
            <Typography variant="button" >CANCEL</Typography>
          </Button>
        </Grid>
          <Grid item>
            <Button variant='text' color='primary' type='submit'>
              <Typography variant="button" >{init.label}</Typography>
            </Button>
          </Grid>
        </Grid>

      </form>
    </Grid>
  );

  return (
    <Grid item container xs={12} justify="center" alignItems="stretch">
      <Grid item xs={6} className={classes.grid}>

        <Paper className={classes.body}>
          <Grid item xs={12} >
            <div className={classes.header}>
              <Typography variant="h6" styles={{padding: "0px"}}>Rate and review</Typography>
            </div>
          </Grid>
          <Grid item container direction="column" style={{margin: "auto"}} className={classes.content}>
            <Grid item>
              {ContentMid}
              {ContentDown}
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
}

export default ReviewModal;
