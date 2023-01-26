import authController from "./auth.js"
import usersController from "./users.js"
import callsController from "./calls.js"
import chatsController from "./chats.js"
import groupsController from "./groups.js"
import * as channelsController from './channels.js'

export default {
    auth: authController,
    users: usersController,
    calls: callsController,
    chats: chatsController,
    groups: groupsController,
    channels: channelsController,
}
