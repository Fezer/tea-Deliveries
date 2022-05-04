const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

deliveryRouter.post("/createDelivery", auth, access.associateAccess, deliveryController.createDelivery);
deliveryRouter.get("/listAllDeliveries", auth, deliveryController.listAllDeliveries);
deliveryRouter.get("/listAllDoneDeliveries", auth, deliveryController.listAllDoneDeliveries);
deliveryRouter.get("/listAllPendingDeliveries", auth, deliveryController.listAllPendingDeliveries);
deliveryRouter.get("/listAllDeliveriesByMotoboy", auth, access.associateAccess, deliveryController.listAllDeliveriesByMotoboy);
deliveryRouter.put("/editPendingDelivery/:id", auth, deliveryController.editPendingDelivery);
deliveryRouter.delete("/removePendingDelivery/:id", auth, access.associateAccess, deliveryController.removePendingDelivery);

module.exports = deliveryRouter;