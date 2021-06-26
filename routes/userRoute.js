const express = require("express");

const userValidator = require("../middlewares/validators/userValidator");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/checkIn", userValidator.checkIn, userController.checkIn);
router.get("/", userController.getAll);
router.get("/checkOut", userController.checkOut);
router.get("/filter", userController.getByFilter);

module.exports = router;
