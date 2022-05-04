const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

clientRouter.post("/createClient",auth, access.associateAccess, clientController.createClient);
clientRouter.get("/listAllClients",auth, access.associateAccess, clientController.listAllClients);
clientRouter.get("/listClient",auth, access.associateAccess, clientController.listClient);
clientRouter.put("/editClient/:id",auth, access.associateAccess, clientController.editClient);
clientRouter.delete("/removeClient/:id",auth, access.associateAccess, clientController.removeClient);

module.exports = clientRouter;