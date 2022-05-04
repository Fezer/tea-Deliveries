const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");

clientRouter.post("/createClient/", clientController.createClient);
clientRouter.get("/listAllClients", clientController.listAllClients);
clientRouter.get("/listClient", clientController.listClient);
clientRouter.put("/editClient/:id", clientController.editClient);
clientRouter.delete("/removeClient/:id", clientController.removeClient);

module.exports = clientRouter;