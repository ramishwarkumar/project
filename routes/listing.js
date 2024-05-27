const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js")
const upload = multer({storage});

router
  .route("/")
  // Index Route
  .get(wrapAsync(listingController.index))
  // Create route
  .post(
    isLoggedin,
  upload.single("listing[image]"),
      validateListing,

    wrapAsync(listingController.createListing)
  );


// New Listing route
router.get("/new", isLoggedin, listingController.renderNewForm);


router.route("/:id")
// show Route
.get(wrapAsync(listingController.showListing))
// Update route
.put(
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updatelisting))
  // delete route
  .delete(
    isLoggedin,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );



// Edit route

router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.rendarEditForm)
);

module.exports = router;
