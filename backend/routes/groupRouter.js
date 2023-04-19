const express = require("express")
const router = express.Router()

const {addGroup, getAllGroups, getGroupById, deletegroup, updateGroup, addgroupMember,removeMemberFromGroup} = require("../controllers/groups")
router.route("/").post(addGroup)
router.route("/addMember/:id").post(addgroupMember)
router.route("/removeMember/:id").post(removeMemberFromGroup)
router.route("/").get(getAllGroups)
router.route("/:id").get(getGroupById)
router.route("/:id").put(updateGroup)
router.route("/:id").delete(deletegroup)

module.exports = router