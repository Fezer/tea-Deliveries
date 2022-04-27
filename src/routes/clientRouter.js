const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");

clientRouter.post("/createClient", auth, clientController.createClient);
clientRouter.get("/listAllClients", auth, clientController.listAllClients);
clientRouter.get("/listClient", auth, clientController.listClient);
clientRouter.put("/editClient", auth, clientController.editClient);
clientRouter.delete("/removeClient", auth, clientController.removeClient);

module.exports = clientRouter;