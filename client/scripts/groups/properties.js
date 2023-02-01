import Duo from '../duo/properties.js'
import handle_click_add_member from './handle_click_add_member'
// import handle_click_prev from './handle_click_prev'
import item_member from './item_member'

export default class Groups extends Duo {
	constructor(number, name) {
		super(number, name)
	}
	initialize() {
		super.initialize()

		this.e.l['mem'] = this.e.content.getElementsByClassName('list member')[0]
		this.e.b['icon'] = this.e.bar.info.getElementsByClassName('icon_upload')[0]
		this.e.b['edit'] = this.e.bar.info.getElementsByClassName('button edit')[0]
		this.e.b['submit'] = this.e.bar.info.getElementsByClassName('button submit')[0]
		this.e.b['cancel'] = this.e.bar.info.getElementsByClassName('button cancel')[0]
		this.e.b['add'] = this.e.content.getElementsByClassName('button add_member')[0]
		this.e.t['add'] = this.e.content.getElementsByClassName('text add_member')[0]
		// create_title: this.bare.getElementsByClassName("title")[0]
		this.e.f['icon'] = this.e.bar.info.getElementsByClassName('file')[0] //info_icon_file_edit
	}
	handle_click_add_member = handle_click_add_member.bind(this)
	// handle_click_prev = handle_click_prev.bind(this)
	item_member = item_member.bind(this)
}
