const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const auth = require("../middlewares/auth");

motoboyRouter.post("/createMotoboy", motoboyController.createMotoboy);
motoboyRouter.get("/listAllMotoboys", motoboyController.listAllMotoboys);
motoboyRouter.get("/listMotoboy", motoboyController.listMotoboy);
motoboyRouter.put("/editMotoboy/:id", motoboyController.editMotoboy);
motoboyRouter.delete("/removeMotoboy/:id", motoboyController.removeMotoboy);

module.exports = motoboyRouter;