const router = require("express").Router();
const indexRouter = require("../routes/indexRouter.js");
const userRouter = require("../routes/userRouter.js");
const groupRouter = require("../routes/groupRouter.js")

router.use("/api", indexRouter);
router.use("/api/auth", userRouter);
router.use("/api/group", groupRouter);
module.exports = router;
