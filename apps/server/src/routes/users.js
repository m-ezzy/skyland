import { Router } from 'express'
import usersController from '../controllers/users.js'
import upload_file from '../controllers/upload_file.js'

const usersRouter = Router()

usersRouter.post("/sign_up", usersController.sign_up)
usersRouter.post("/log_in", usersController.log_in)
// usersRouter.post("/sign_up/load", (req, res) => controller.sign_up_load(req, res))
// usersRouter.post("/log_in/load", (req, res) => controller.log_in_load(req, res))
usersRouter.post("/check_conv_name", usersController.check_user_name)
usersRouter.post("/check_pass_word", usersController.check_pass_word)
// usersRouter.post("/load", (req, res) => usersController.load(req, res))
usersRouter.post("/get_info", usersController.get_info)
usersRouter.post("/update/info", usersController.update_info)
usersRouter.post("/update/icon", upload_file.single('file'), (req, res) => usersController.update_icon(req, res))
// usersRouter.get("/get_file_data/icons/:file_name", (req, res) => usersController.get_file_data_icons(req, res)) //get_file_data //download_file
usersRouter.post("/delete", usersController.delete)

export default usersRouter

//account //auth //users //profiles //settings
