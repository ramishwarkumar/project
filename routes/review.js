const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewController=require("../controller/reviews.js")
const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");
const Listing = require("../models/listing.js");

// reviews
// Post Route
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);
// reviews
// Delete Route
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
