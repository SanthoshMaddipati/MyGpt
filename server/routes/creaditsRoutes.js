import express from "express"
import { getPlans, purchasePlane } from "../controllers/creditController.js";
import { protect } from "../middlewares/auth.js";

const creditsRouter = express.Router()

creditsRouter.get('/plan', getPlans)
creditsRouter.post('/purchase', protect ,purchasePlane)

export default creditsRouter