import { Router } from 'express'
import chatsController from '../controllers/chats.js'
import upload_file from '../controllers/upload_file.js'

const chatsRouter = Router()

// chatsRouter.post("/load", (req, res) => chatsController.load(req, res)) //structure //skeleton //load //template
chatsRouter.post("/previous_conv", (req, res) => chatsController.previous_conv(req, res)) //get_previous //previous_conv
chatsRouter.post("/search_new", (req, res) => chatsController.search_new(req, res))
chatsRouter.post("/create", (req, res) => chatsController.create(req, res))
chatsRouter.post("/previous_media", (req, res) => chatsController.previous_media(req, res))
chatsRouter.post("/send_media/message", (req, res) => chatsController.send_media_message(req, res))
chatsRouter.post("/send_media/files", upload_file.array('files', 10), (req, res) => chatsController.send_media_files(req, res))
chatsRouter.post("/update_media_delivered_seen", async (req, res) => chatsController.update_media_delivered_seen(req, res))
chatsRouter.post("/delete", async (req, res) => chatsController.delete(req, res))
chatsRouter.post("/unblock", async (req, res) => chatsController.unblock(req, res))
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
