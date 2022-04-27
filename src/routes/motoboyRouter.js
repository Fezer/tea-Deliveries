const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/clientController");
const auth = require("../middlewares/auth");

motoboyRouter.post("/createMotoboy", auth, motoboyController.createMotoboy);
motoboyRouter.get("/listAllMotoboys", auth, motoboyController.listAllMotoboys);
motoboyRouter.get("/listMotoboy", auth, motoboyController.listMotoboy);
motoboyRouter.put("/editMotoboy", auth, motoboyController.editMotoboy);
motoboyRouter.delete("/removeMotoboy", auth, motoboyController.removeMotoboy);

module.exports = motoboyRouter;