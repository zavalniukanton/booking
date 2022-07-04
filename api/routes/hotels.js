import {Router} from "express"

import {createHotel, deleteHotel, getHotel, getHotels, updateHotel} from "../controllers/hotel.js";

const router = Router()

router.post("/", createHotel)
router.put("/:id", updateHotel)
router.delete("/:id", deleteHotel)
router.get("/:id", getHotel)
router.get("/", getHotels)

export default router