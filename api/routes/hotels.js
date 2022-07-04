import {Router} from "express"


const router = Router()

//CREATE
router.post("/", async (req, res, next) => {
  console.log("This is hotels route")
})



export default router