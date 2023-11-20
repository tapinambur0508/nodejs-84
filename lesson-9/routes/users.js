const express = require("express");

const UserController = require("../controllers/user");

const upload = require("../middleware/upload");

const router = express.Router();

router.get("/avatar", UserController.getAvatar);
router.patch("/avatar", upload.single("avatar"), UserController.uploadAvatar);

module.exports = router;
