const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");

associateRouter.post("/createAssociate", associateController.createAssociate);
associateRouter.get("/listAllAssociates", associateController.listAllAssociates);
associateRouter.get("/listAssociate", associateController.listAssociate);
associateRouter.put("/editAssociate", associateController.editAssociate);
associateRouter.delete("/removeAssociate", associateController.removeAssociate);
associateRouter.put("/updatePassword", associateController.updatePassword);

module.exports = associateRouter;