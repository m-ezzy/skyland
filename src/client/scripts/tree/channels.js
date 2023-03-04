import Trio from './trio'

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
}
