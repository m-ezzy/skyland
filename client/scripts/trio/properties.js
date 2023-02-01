import Common from '../common/properties.js'
import { handle_click_back, handle_click_search, handle_click_search_previous, handle_change_icon } from './event_handlers'
import handle_change_files from './handle_change_files'
import handle_click_cancel from './handle_click_cancel'
import handle_click_create from './handle_click_create'
import handle_click_edit from './handle_click_edit'
import handle_click_info from './handle_click_info'
import handle_click_leave from './handle_click_leave'
import handle_click_menu from './handle_click_menu'
import handle_click_prev from './handle_click_prev'
import handle_click_send from './handle_click_send'
import handle_click_submit from './handle_click_submit'
import handle_input_search from './handle_input_search'
import handle_scroll_conv from './handle_scroll_conv'
import item_conv from './item_conv'
import item_media from './item_media'
import item_previous from './item_previous'
import update_info from './update_info'
import update_leave from './update_leave'

export default class Trio extends Common {
	constructor(number, name) {
		super(number, name)
		this.members = new Map()
		this.media = new Map()
		this.info_is_open = false
	}
	initialize() {
		super.initialize()

		this.e['bar']['info'] = this.e.content.getElementsByClassName('bar info')[0]
		this.e['b']['files'] = this.e.content.getElementsByClassName('button files')[0]
		this.e['b']['send'] = this.e.content.getElementsByClassName('button send')[0]
		this.e['t']['msg'] = this.e.content.getElementsByClassName('text textbox_message')[0]
		this.e['f']['files'] = this.e.content.getElementsByClassName('input files')[0]
		this.e['info']['i'] = this.e.bar.info.getElementsByClassName('image icon')[0]
		this.e['info']['cn'] = this.e.bar.info.getElementsByClassName('conv_name')[0]
		this.e['info']['t'] = this.e.bar.info.getElementsByClassName('title')[0] //this.e.t.title
		//icon, conv_name, title - in all 3 bars - search list, previous list, header, info
	}
	handle_click_menu = handle_click_menu.bind(this)
	handle_click_back = handle_click_back.bind(this)
	handle_click_search = handle_click_search.bind(this)
	handle_click_search_previous = handle_click_search_previous.bind(this)
	handle_click_create = handle_click_create.bind(this)
	handle_click_prev = handle_click_prev.bind(this)
	handle_click_send = handle_click_send.bind(this)
	handle_click_info = handle_click_info.bind(this)
	handle_scroll_conv = handle_scroll_conv.bind(this)
	handle_change_files = handle_change_files.bind(this)
	handle_change_icon = handle_change_icon.bind(this)
	handle_click_edit = handle_click_edit.bind(this)
	handle_click_leave = handle_click_leave.bind(this)
	handle_click_submit = handle_click_submit.bind(this)
  handle_input_search = handle_input_search.bind(this)
	handle_click_cancel = handle_click_cancel.bind(this)
	item_conv = item_conv.bind(this)
	item_media = item_media.bind(this)
	item_previous = item_previous.bind(this)
	update_info = update_info.bind(this)
	update_leave = update_leave.bind(this)
}
