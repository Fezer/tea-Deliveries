const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");

associateRouter.post("/createAssociate", auth, associateController.createAssociate);
associateRouter.get("/listAllAssociates", auth, associateController.listAllAssociates);
associateRouter.get("/listAssociate", auth, associateController.listAssociate);
associateRouter.put("/editAssociate", auth, associateController.editAssociate);
associateRouter.delete("/removeAssociate", auth, associateController.removeAssociate);

module.exports = associateRouter;