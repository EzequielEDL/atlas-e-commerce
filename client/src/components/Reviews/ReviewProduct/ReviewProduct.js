import React, { useState } from 'react';
// import { getOrdersById } from '../../controllers/orders';
import {
  Grid,
  Typography,
  Button,
  Modal
} from "@material-ui/core";
import {
  StarEmptyIcon,
  StarFullIcon,
  DeleteIcon,
  UpdateIcon,
  AddIcon
} from '../../SvgIcons/IconsMaterial';
import ReviewModal from "./ReviewModal";

const getStarsState = (promScore, totalScore) => {
  let stars = { text: `Average between ${totalScore} people`, state: [] };
  for (let i = 0; i < 5; i++) {
    promScore > 0 ? stars.state.push(true) : stars.state.push(false)
    promScore--;
  }
  return stars;
}


const ReviewProduct = ({ productStat, userStat, init, handleSubmitDelete, handleFinalSubmit }) => {
  const stars = getStarsState(Math.round(productStat.promScore), productStat.totalScore);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ContentTopLeft = (
    <Grid item container direction="row" alignItems="flex-start" spacing={2} style={{margin: "auto 0px"}}>
      <Grid item>
        <Typography variant="h3" >{productStat.promScore}</Typography>
      </Grid>

      <Grid item>
        <Grid item container direction="row" spacing={1}>
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
        <Grid item>
          <Typography variant="body2">{stars.text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const ContentTopRight = (
    <Grid item container direction="row" justify="flex-end" spacing={1}>
      {init.review ? (
          <>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{margin: "0px 0px"}}
              onClick={handleSubmitDelete}
            >
              <DeleteIcon />
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<UpdateIcon />}>
              <Typography variant="button" >Edit review</Typography>
            </Button>
          </Grid>
          </>
        )
        :(
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
              <Typography variant="button" >Add review</Typography>
            </Button>
          </Grid>
        )
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="review"
        aria-describedby="rate-and-review-product"
      >
        <>
          <ReviewModal
            init={init}
            handleClose={handleClose}
            handleFinalSubmit={handleFinalSubmit}
          />
        </>
      </Modal>

    </Grid>
  );

  return (
    <Grid item container>
      <Grid item container xs={12}>
        <Grid item container xs={12}>
          <Grid item xs={6}>{ContentTopLeft}</Grid>
          {init.orderStatus &&
            <Grid item xs={6}>{ContentTopRight}</Grid>
          }{""}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReviewProduct;
