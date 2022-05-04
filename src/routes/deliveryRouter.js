const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.post("/createDelivery", deliveryController.createDelivery);
deliveryRouter.get("/listAllDeliveries", deliveryController.listAllDeliveries);
deliveryRouter.get("/listAllDoneDeliveries", deliveryController.listAllDoneDeliveries);
deliveryRouter.get("/listAllPendingDeliveries", deliveryController.listAllPendingDeliveries);
deliveryRouter.get("/listAllDeliveriesByMotoboy", deliveryController.listAllDeliveriesByMotoboy);
deliveryRouter.put("/editPendingDelivery", deliveryController.editPendingDelivery);
deliveryRouter.delete("/removePendingDelivery", deliveryController.removePendingDelivery);

module.exports = deliveryRouter;