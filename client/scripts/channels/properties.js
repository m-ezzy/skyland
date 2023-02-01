import Trio from '../trio/properties'
import handle_click_demote_promote from './handle_click_demote_promote'
import handle_click_join from './handle_click_join'
import item_member from './item_member'
import update_designation from './update_designation'

export default class Channels extends Trio {
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
		this.e.f['icon'] = this.e.bar.info.getElementsByClassName('file')[0] //info_icon_file_edit
  }
  handle_click_demote_promote = handle_click_demote_promote.bind(this)
  handle_click_join = handle_click_join.bind(this)
  item_member = item_member.bind(this)
  update_designation = update_designation.bind(this)
}
