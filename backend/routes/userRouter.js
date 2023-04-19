const express = require("express")
const router = express.Router()

const { register , login, deleteuser} = require("../controllers/auth")
router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/:id").delete(deleteuser)

module.exports = router