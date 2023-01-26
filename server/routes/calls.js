import { Router } from 'express'
import callsController from '../controllers/calls.js'

const callsRouter = Router()

callsRouter.post("/load", async (req, res) => callsController.load(req, res))
callsRouter.post("/get_history", async (req, res) => callsController.get_history(req, res))
callsRouter.post("/make_call/chats", async (req, res) => callsController.make_call_chats(req, res))
callsRouter.post("/make_call/groups", async (req, res) => callsController.make_call_groups(req, res))
callsRouter.post("/change_call_length/chats", async (req, res) => callsController.change_call_length_chats(req, res))
callsRouter.post("/change_call_length/groups", async (req, res) => callsController.change_call_length_groups(req, res))

export default callsRouter
