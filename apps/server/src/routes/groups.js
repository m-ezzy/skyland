import { Router } from 'express'
import groupsController from '../controllers/groups.js'
import upload_file from '../controllers/upload_file.js'

const groupsRouter = Router()

groupsRouter.post("/previous_conv", groupsController.previous_conv)
groupsRouter.post("/search_new", groupsController.search_new)
groupsRouter.post("/check_conv_name", groupsController.check_conv_name)
groupsRouter.post("/create", groupsController.create)
groupsRouter.post("/previous_media", groupsController.previous_media)
groupsRouter.post("/send_media/message", groupsController.send_media_message)
groupsRouter.post("/send_media/files", upload_file.array("files", 10), groupsController.send_media_files)
groupsRouter.post("/update/info", groupsController.update_info)
groupsRouter.post("/update/icon", upload_file.single("file"), groupsController.update_icon)
groupsRouter.post("/add_member", groupsController.add_member)   //add_member //join
groupsRouter.post("/leave", groupsController.leave)

export default groupsRouter
