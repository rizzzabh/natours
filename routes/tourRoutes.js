const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/top-rated")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo(["admin"]),
    tourController.getAllTours
  )
  .post(tourController.addTour);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router.get("/:id", tourController.getTour);

module.exports = router;
