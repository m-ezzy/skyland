import Duo from '../duo/properties'
import handle_click_create from './handle_click_create'
import handle_click_delete from './handle_click_delete'

export default class Chats extends Duo {
  constructor(number, name) {
    super(number, name)
    this.name = 'chat'
		this.place_holder =  "/media/images/place_holder/users.png"
  }
  initialize() {
    super.initialize()
  }
  /*add_item_previous(...a) {
    let r = add_item_previous.bind(this, ...a).call()
    // add_item_previous.call(this)
  }*/
  handle_click_create = handle_click_create.bind(this)
  handle_click_delete = handle_click_delete.bind(this)
}
