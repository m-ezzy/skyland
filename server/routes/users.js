import { Router } from 'express'
import usersController from '../controllers/users.js'
import upload_file from '../controllers/upload_file.js'

const usersRouter = Router()

usersRouter.post("/check_user_name", (req, res) => usersController.check_user_name(req, res))
usersRouter.post("/check_pass_word", (req, res) => usersController.check_pass_word(req, res))
usersRouter.post("/load", (req, res) => usersController.load(req, res))
usersRouter.post("/get_info", (req, res) => usersController.get_info(req, res))
usersRouter.post("/update/info", (req, res) => usersController.update_info(req, res))
usersRouter.post("/update/profile_picture", upload_file.single('profile_picture'), (req, res) => usersController.update_profile_picture(req, res))
// usersRouter.get("/get_file_data/icons/:file_name", (req, res) => usersController.get_file_data_icons(req, res)) //get_file_data //download_file

export default usersRouter

//account //auth //users //profiles //settings
