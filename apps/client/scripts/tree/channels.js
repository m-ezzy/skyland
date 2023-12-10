import Trio from './trio'

import handle_change_conv_name from '../conv/1_groups_channels/handle_change_conv_name'
import handle_change_title from '../conv/1_groups_channels/handle_change_title'

export default class Channels extends Trio {
  constructor(number, name) {
    super(number, name)
  }
  initialize() {
    super.initialize()

		this.validation.create = {
			conv_name: false,
			title: false,
		}

		this.e['modal_create'] = this.e.content.getElementsByClassName('modal-create')[0]
    this.e.l['mem'] = this.e.content.getElementsByClassName('list member')[0]
		this.e.b['icon'] = this.e.bar.info.getElementsByClassName('icon_upload')[0]
		this.e.b['edit'] = this.e.bar.info.getElementsByClassName('button edit')[0]
		this.e.b['submit'] = this.e.bar.info.getElementsByClassName('button submit')[0]
		this.e.b['cancel'] = this.e.bar.info.getElementsByClassName('button cancel')[0]
		this.e.f['icon'] = this.e.bar.info.getElementsByClassName('file')[0] //info_icon_file_edit
	}
	handle_change_conv_name = handle_change_conv_name
	handle_change_title = handle_change_title
}
