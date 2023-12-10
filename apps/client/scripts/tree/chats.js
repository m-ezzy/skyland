import Duo from './duo'

import handle_click_create_chats from '../conv/2_chats/handle_click_create_chats'

export default class Chats extends Duo {
  constructor(number, name) {
    super(number, name)
    // this.name = 'user'
    // this.names = this.name + 's'
		this.place_holder =  "/media/images/place_holder/users.png"
  }
  initialize() {
    super.initialize()
  }
  icon_src(conv_id) {
    let { user_id, extension } = this.conv[conv_id]
		let src = extension ? `/data/icons/users/${user_id}.${extension}` : `/media/images/place_holder/users.png`
		return src
	}
  /*add_item_previous(...a) {
    let r = add_item_previous.bind(this, ...a).call()
    // add_item_previous.call(this)
  }*/
  handle_click_create_chats = handle_click_create_chats
}
