const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

associateRouter.post("/createAssociate", access.adminAccess, auth, access.associateAccess, associateController.createAssociate);
associateRouter.get("/listAllAssociates", access.adminAccess, auth, access.associateAccess, associateController.listAllAssociates);
associateRouter.get("/listAssociate", access.adminAccess, auth, access.associateAccess, associateController.listAssociate);
associateRouter.put("/editAssociate", access.adminAccess, auth, access.associateAccess, associateController.editAssociate);
associateRouter.delete("/removeAssociate", access.adminAccess, auth, access.associateAccess, associateController.removeAssociate);
associateRouter.put("/updatePassword", access.adminAccess, auth, access.associateAccess, associateController.updatePassword);

module.exports = associateRouter;