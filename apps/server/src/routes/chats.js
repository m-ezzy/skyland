import { Router } from 'express'
import chatsController from '../controllers/chats.js'
import upload_file from '../controllers/upload_file.js'

const chatsRouter = Router()

// chatsRouter.post("/load", (req, res) => chatsController.load(req, res)) //structure //skeleton //load //template
chatsRouter.post("/previous_conv", chatsController.previous_conv) //get_previous //previous_conv
chatsRouter.post("/search_new", chatsController.search_new)
chatsRouter.post("/create", chatsController.create)
chatsRouter.post("/previous_media", chatsController.previous_media)
chatsRouter.post("/send_media/message", chatsController.send_media_message)
chatsRouter.post("/send_media/files", upload_file.array('files', 10), chatsController.send_media_files)
// chatsRouter.post("/update_media_delivered_seen", chatsController.update_media_delivered_seen)
chatsRouter.post("/leave", chatsController.leave)
chatsRouter.post("/delete", chatsController.delete)
chatsRouter.post("/unblock", chatsController.unblock)
// chatsRouter.get("/get_file_data/media/:chat_id/:file_name", (req, res) => chatsController.get_file_data_media(req, res))
// chats.post("/chats/check_for_new_conv", async (req, res) => chats.check_for_new_conv(req, res))
// chats.post("/chats/check_for_new_media", async (req, res) => chats.check_for_new_media(req, res))

export default chatsRouter

/*
let controllers = {
	chats: require('../controllers/chats.js')
}
// OR
let chats = require("../controllers/chats")
// OR
const { send_message } = require("../controllers/chats")
*/
