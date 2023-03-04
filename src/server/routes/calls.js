import { Router } from 'express'
import callsController from '../controllers/calls.js'

const callsRouter = Router()

// callsRouter.post("/load", async (req, res) => callsController.load(req, res))
callsRouter.post("/get_history", callsController.get_history)
callsRouter.post("/make_call/chats", callsController.make_call_chats)
callsRouter.post("/make_call/groups", callsController.make_call_groups)
callsRouter.post("/change_call_length/chats", callsController.change_call_length_chats)
callsRouter.post("/change_call_length/groups", callsController.change_call_length_groups)

export default callsRouter
