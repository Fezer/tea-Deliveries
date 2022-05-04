const express = require("express");
const associateRouter = require("./associateRouter");
const clientRouter = require("./clientRouter");
const deliveryRouter = require("./deliveryRouter");
const motoboyRouter = require("./motoboyRouter");
const authRouter = require("./authRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("App rodando!");
});

router.use("/associate", associateRouter);
router.use("/client", clientRouter);
router.use("/delivery", deliveryRouter);
router.use("/motoboy", motoboyRouter);
router.use("/auth", authRouter)

module.exports = router;