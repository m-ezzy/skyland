import Common from './common'

import handle_click_back from '../conv/search/handle_click_back'
import handle_input_search from '../conv/search/handle_input_search'

import handle_click_search_previous from '../conv/search/handle_click_search_previous'
import handle_click_create from '../conv/1_groups_channels/handle_click_create'
import handle_click_join from '../conv/2_channels/handle_click_join'
import handle_click_add_member from '../conv/2_groups/handle_click_add_member'

import handle_click_prev from '../conv/prev/handle_click_prev'

import handle_click_detail from '../conv/info/handle_click_detail'
import handle_click_call from '../conv/1_chats_groups/handle_click_call'
import handle_input_key from '../conv/1_chats_groups/handle_input_key'
import handle_click_key from '../conv/1_chats_groups/handle_click_key'

import handle_scroll_conv from '../conv/media/handle_scroll_conv'

import handle_click_send from '../conv/media/handle_click_send'
import handle_change_files from '../conv/media/handle_change_files'
import handle_click_location from '../conv/media/handle_click_location'

import handle_change_icon from '../conv/1_groups_channels/handle_change_icon'
import handle_click_edit from '../conv/1_groups_channels/handle_click_edit'
import handle_click_submit from '../conv/1_groups_channels/handle_click_submit'
import handle_click_cancel from '../conv/1_groups_channels/handle_click_cancel'
import handle_click_demote_promote from '../conv/2_channels/handle_click_demote_promote'

import handle_click_leave_delete from '../conv/delete/handle_click_leave_delete'

import add_prev from '../conv/prev/add_prev'
import add_media from '../conv/media/add_media'
import add_member from '../conv/1_groups_channels/add_member'

import create_notification from '../menu/create_notification'

import update_browser_route from '../menu/update_browser_route'
import update_info from '../conv/info/update_info'
import update_item_prev from '../conv/prev/update_item_prev'
import update_detail from '../conv/info/update_detail'
import update_info_bar from '../conv/info/update_info_bar'
import update_card from '../conv/info/update_card'
import update_designation from '../conv/2_channels/update_designation'
import on_leave from '../conv/delete/on_leave'
import on_delete from '../conv/delete/on_delete'

import load from '../conv/prev/load'

export default class Trio extends Common {
	constructor(number, name) {
		super(number, name)
		this.members = new Map()
		this.media = new Map()
		this.info_is_open = false
		// this.info_conv_id = 0
	}
	icon_src(conv_id) {
		let names = this.names
		let id = conv_id
		if(this.names == 'chats') {
			names = 'users'
			id = this.conv[conv_id].user_id
		}
		let place_holder = `/media/images/place_holder/${names}.png`
		let src = (this.conv[conv_id].extension) ? `/data/icons/${names}/${id}.${this.conv[conv_id].extension}` : place_holder
		return src
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
		this.e['b']['exit'] = this.e.bar.info.getElementsByClassName('button exit')[0] //this.e.t.title
		//icon, conv_name, title - in all 3 bars - search list, previous list, header, info
	}

	handle_click_back = handle_click_back
  handle_input_search = handle_input_search.bind(this)
	handle_click_search_previous = handle_click_search_previous.bind(this)
	handle_click_create = handle_click_create.bind(this)
	handle_click_join = handle_click_join.bind(this)
	handle_click_add_member = handle_click_add_member.bind(this)

	handle_click_prev = handle_click_prev

	handle_click_detail = handle_click_detail
	handle_click_call = handle_click_call.bind(this)
	handle_click_key = handle_click_key.bind(this)
	handle_input_key = handle_input_key.bind(this)

	handle_scroll_conv = handle_scroll_conv
	handle_click_send = handle_click_send
	handle_change_files = handle_change_files
	handle_click_location = handle_click_location
	
	handle_change_icon = handle_change_icon
	handle_click_edit = handle_click_edit
	handle_click_submit = handle_click_submit
	handle_click_cancel = handle_click_cancel
  handle_click_demote_promote = handle_click_demote_promote

	handle_click_leave_delete = handle_click_leave_delete

	add_prev = add_prev
	add_media = add_media
	add_member = add_member

	create_notification = create_notification

	update_browser_route = update_browser_route.bind(this)
	update_info = update_info.bind(this)
	update_item_prev = update_item_prev.bind(this)
	update_detail = update_detail.bind(this)
	update_info_bar = update_info_bar.bind(this)
	update_card = update_card
	update_designation = update_designation
	on_leave = on_leave
	on_delete = on_delete

	load = load
}
