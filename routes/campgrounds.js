const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAysnc = require("../utilities/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/campground");

router
  .route("/")
  .get(catchAysnc(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAysnc(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAysnc(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAysnc(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAysnc(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAysnc(campgrounds.renderEditForm)
);

module.exports = router;
