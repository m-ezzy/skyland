import { Router } from 'express'
import * as controller from '../controllers/auth.js'

const router = Router()

router.post("/sign_up", (req, res) => controller.sign_up(req, res))
router.post("/log_in", (req, res) => controller.log_in(req, res))
router.post("/sign_up/load", (req, res) => controller.sign_up_load(req, res))
router.post("/log_in/load", (req, res) => controller.log_in_load(req, res))

export default router
