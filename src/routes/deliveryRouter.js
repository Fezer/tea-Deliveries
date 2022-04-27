const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.post("/createDelivery", auth, deliveryController.createDelivery);
deliveryRouter.get("/listAllDeliveries", auth, deliveryController.listAllDeliveries);
deliveryRouter.get("/listAllDoneDeliveries", auth, deliveryController.listAllDoneDeliveries);
deliveryRouter.get("/listAllPendingDeliveries", auth, deliveryController.listAllPendingDeliveries);
deliveryRouter.get("/listAllDeliveriesByMotoboy", auth, deliveryController.listAllDeliveriesByMotoboy);
deliveryRouter.put("/editPendingDelivery", auth, deliveryController.editPendingDelivery);
deliveryRouter.delete("/removePendingDelivery", auth, deliveryController.removePendingDelivery);

module.exports = deliveryRouter;