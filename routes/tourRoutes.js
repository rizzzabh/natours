const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

router
  .route("/top-rated")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router.route("/").get(tourController.getAllTours).post(tourController.addTour);

router.get("/:id", tourController.getTour);

module.exports = router;
