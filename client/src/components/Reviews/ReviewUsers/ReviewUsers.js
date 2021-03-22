import React from 'react';
import {
  Grid,
  Typography
} from "@material-ui/core";

import {
  StarEmptyIcon,
  StarFullIcon
} from '../../SvgIcons/IconsMaterial'

//AGREGAR REDUX POR USUARIO

const getStarsState = star => {

  const scoreText = [
    "Very bad",
    "Bad",
    "Good",
    "Very good",
    "Excellent"
  ];

  let stars = {
    text: `${scoreText[star - 1]}`,
    state: []
  };

  for (let i = 0; i < 5; i++) {
    star > 0 ? stars.state.push(true) : stars.state.push(false)
    star--;
  }
  return stars;
}

const ReviewUser = ({ reviews }) => {

  const Review = ({ stars, review }) => {
    return (
      <Grid item container direction="column" style={{margin: "auto"}}>
        <Grid item container direction="row" spacing={1} style={{margin: "auto"}}>
          {stars.state.map((star, index) => (
            <Grid item key={index}>
              {star
                ?(
                  <StarFullIcon />
                )
                :(
                  <StarEmptyIcon />
                )
              }
            </Grid>
            ))
          }
        </Grid>
        <Grid item container style={{margin: "auto"}}>
          <Grid item><Typography variant="subtitle2">{stars.text}</Typography></Grid>
        </Grid>
        <Grid item container style={{margin: "auto"}}>
          <Grid item><Typography variant="body2" color="textSecondary">{review.description}</Typography></Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid item container>
      <Grid item container xs={12}>
        <Grid item container xs={12}>
          {reviews && reviews.length > 0 ?
            (
              <>
                {reviews.map((review, index) => (
                    <Review stars={getStarsState(review.score)} key={index} review={review}/>
                  ))
                }
              </>
            )
            :(
              <Typography variant="subtitle1" color="textSecondary">Dont have any reviews yet</Typography>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReviewUser;
