const express = require("express")
const route = express.Router()
const controller =  require("../controllers")

route.post("/createPost",controller.createPost)
route.patch("/updatePost/:id",controller.updatePost)
route.get("/postList", controller.postList)

module.exports = route