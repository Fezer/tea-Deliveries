const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

motoboyRouter.post("/createMotoboy",auth, access.associateAccess, motoboyController.createMotoboy);
motoboyRouter.get("/listAllMotoboys",auth,access.associateAccess, motoboyController.listAllMotoboys);
motoboyRouter.get("/listMotoboy",auth,access.associateAccess, motoboyController.listMotoboy);
motoboyRouter.put("/editMotoboy/:id",auth, access.associateAccess,motoboyController.editMotoboy);
motoboyRouter.delete("/removeMotoboy/:id",auth, access.associateAccess, motoboyController.removeMotoboy);

module.exports = motoboyRouter;