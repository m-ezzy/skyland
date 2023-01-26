import { Router } from 'express'
import groupsController from '../controllers/groups.js'
import upload_file from '../controllers/upload_file.js'

const groupsRouter = Router()

groupsRouter.post("/load", (req, res) => groupsController.load(req, res))
groupsRouter.post("/previous_conv", (req, res) => groupsController.previous_conv(req, res))
groupsRouter.post("/search_create_new", (req, res) => groupsController.search_create_new(req, res))
groupsRouter.post("/create", (req, res) => groupsController.create(req, res))
groupsRouter.post("/previous_media", (req, res) => groupsController.previous_media(req, res))
groupsRouter.post("/send_media/message", (req, res) => groupsController.send_media_message(req, res))
groupsRouter.post("/send_media/files", upload_file.array("files", 10), (req, res) => groupsController.send_media_files(req, res))
groupsRouter.post("/update/info", (req, res) => groupsController.update_info(req, res))
groupsRouter.post("/update/icon", upload_file.single("file"), (req, res) => groupsController.update_icon(req, res))
groupsRouter.post("/add_member", (req, res) => groupsController.add_member(req, res))   //add_member //join
groupsRouter.post("/leave", (req, res) => groupsController.leave(req, res))

export default groupsRouter
