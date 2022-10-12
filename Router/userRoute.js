const express = require("express");
const { createUser, getAllUser, getUserDetails, deleteUser, updateUserInfo, createAdmin, cheackAdmin, cheackEditor } = require("../Controler/userControler");
const router = express.Router();


router.post("/" , createUser)
router.get("/" , getAllUser)
router.get("/:id" , getUserDetails)
router.delete("/:id" , deleteUser)
router.put("/:id" , updateUserInfo)
router.put("/createAdmin/:email" , createAdmin)
router.get("/checkAdmin/:email" , cheackAdmin)
router.get("/checkEditor/:email" , cheackEditor)



module.exports = router;