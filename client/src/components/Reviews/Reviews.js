import React, { useEffect, useState } from 'react';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import ReviewUsers from './ReviewUsers/ReviewUsers'
import { connect } from "react-redux";
import { createReview, updateReview, deleteReview, getReviewsById } from '../../controllers/reviews';
import { getOrdersById } from '../../controllers/orders';

const filterReviewByUser = (userId, reviews) => {
  const reviewUserFinded = reviews.filter(review => review.userId === userId)[0];
  return reviewUserFinded
}

const filterOrderByProduct = (productId, orders) => {
  const orderFinded = orders.filter(o => o.products.findIndex(p => p.id === productId) !== -1 )[0]
  return orderFinded
}

const getPromScore = reviews => {
  let total;
  if (reviews && reviews.length > 0) {
    total = reviews.reduce((a, b) => ({score: a.score + b.score}).score / reviews.length).score.toFixed(1)
  }
  else total = 0;
  return total;
}

const Reviews = ({ user, productId }) => {
  const [reviews, setReviews] = useState();
  const [productStat, setProductStat] = useState({ totalScore: 0,  promScore: 0 });
  const [init, setInit] = useState({
    label: "POST",
    userName: user.name,
    review: undefined,
    orderStatus: false
  });

  const updateInit = ({ label, review, orderStatus }) => {
    setInit({
      label: label || init.label,
      userName: user.name,
      review: review,
      orderStatus: orderStatus || init.orderStatus
    })
  }

  const handleFinalSubmit = inputs => {
    if (init.label === "POST") {
      console.log("CREATE", {...inputs, idUser: user.id})
      createReview(productId, {...inputs, idUser: user.id})
      .then(resReview => {
        updateInit({label: "EDIT", review: resReview})
        updateAllStates();
      })
      .catch(err => console.log(err));
    }

    if (init.label === "EDIT") {
      updateReview(init.review.id, inputs)
      .then(() => {
        updateAllStates();
      })
      .catch(err => console.log(err))
    }
  }

  const handleSubmitDelete = () => {
    deleteReview(init.review.id)
    .then(res => {
      updateAllStates();
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  const updateAllStates = () => {
    let reviewsApi;
    getReviewsById(productId)
    .then(reviewsRes => {
      reviewsApi = reviewsRes;
      setReviews(reviewsRes);
      setProductStat({
        totalScore: reviewsRes.length,
        promScore: getPromScore(reviewsRes)
      })
      return getOrdersById(user.id)
    })
    .then(ordersRes => {
      const orderUser = filterOrderByProduct(productId, ordersRes);
      if (orderUser && orderUser.status === "Success") {
        let review = filterReviewByUser(user.id, reviewsApi);
        if (review) updateInit({label: "EDIT", review: review, orderStatus: true});
        else updateInit({label: "POST", review: undefined, orderStatus: true});
        console.log(init)
      }
    })
    .catch(res => console.log(res))
  }

  useEffect(() => {
    let reviewsApi;
    getReviewsById(productId)
    .then(reviewsRes => {
      reviewsApi = reviewsRes;
      setReviews(reviewsRes);
      setProductStat({
        totalScore: reviewsRes.length,
        promScore: getPromScore(reviewsRes)
      })
      return getOrdersById(user.id)
    })
    .then(ordersRes => {
      const orderUser = filterOrderByProduct(productId, ordersRes);
      if (orderUser && orderUser.status === "Success") {
        let review = filterReviewByUser(user.id, reviewsApi);
        if (review) updateInit({label: "EDIT", review, orderStatus: true});
        else updateInit({label: "POST", review: undefined, orderStatus: true});
      }
    })
    .catch(res => console.log(res))
    /* eslint-disable */
	}, [])  
  return (
    <>
      <ReviewProduct
        productStat={productStat}
        init={init}
        user={user}
        handleSubmitDelete={handleSubmitDelete}
        handleFinalSubmit={handleFinalSubmit}
      />
      <ReviewUsers reviews={reviews} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user_store.user
  };
};

export default connect(mapStateToProps)(Reviews);
