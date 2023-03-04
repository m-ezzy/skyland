import { Router } from 'express'
import * as channelsController from '../controllers/channels.js'
import upload_file from '../controllers/upload_file.js'

const channelsRouter = Router()

// channelsRouter.post("/load", (req, res) => channelsController.load(req, res))
channelsRouter.post("/previous_conv", (req, res) => channelsController.previous_conv(req, res))
//channelsRouter.post("/search_new_exact_match", (req, res) => channelsController.search_new_exact_match(req, res))
channelsRouter.post("/search_new", (req, res) => channelsController.search_new(req, res))
channelsRouter.post("/join", (req, res) => channelsController.join(req, res))
channelsRouter.post("/create", (req, res) => channelsController.create(req, res))
channelsRouter.post("/previous_media", (req, res) => channelsController.previous_media(req, res))
channelsRouter.post("/send_media/message", (req, res) => channelsController.send_media_message(req, res))
channelsRouter.post("/send_media/files", upload_file.array("files", 10), (req, res) => channelsController.send_media_files(req, res))
channelsRouter.post("/update/info", (req, res) => channelsController.update_info(req, res))
channelsRouter.post("/update/icon", upload_file.single("file"), (req, res) => channelsController.update_icon(req, res))
channelsRouter.post("/demote_promote", (req, res) => channelsController.demote_promote(req, res)) //promote_demote //update_designation
channelsRouter.post("/leave", (req, res) => channelsController.leave(req, res))
channelsRouter.post("/delete", (req, res) => channelsController.delete_channel(req, res))

export default channelsRouter
