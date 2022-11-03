const express = require("express");
const productController = require("../controller/tour.controller");
const router = express.Router();
router
  .route("/")
  .get(productController.getProduct)
  .post(productController.createProduct);

router.route("/cheapestTour").get(productController.getThreeCheapestTour);
router.route("/mostViewdTour").get(productController.getThreeViewdTour);

router.route("/:id").patch(productController.updateController);
router.route("/:id").get(productController.getProductById);

module.exports = router;
