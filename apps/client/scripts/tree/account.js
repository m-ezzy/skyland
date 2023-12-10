import Content from './content'
import load from '../account/load'
import handle_click_edit from '../account/handle_click_edit'
import handle_click_submit from '../account/handle_click_submit'
import handle_click_cancel from '../account/handle_click_cancel'
import handle_change_icon from '../account/handle_change_icon'
import handle_click_logout from '../account/handle_click_logout'
import handle_click_delete from '../account/handle_click_delete'

export default class Account extends Content {   //settings //accounts
	constructor(...args) {
		super(...args)
		// this.names = 'account'
		this.all = {}
		this.e['i'] = {}
	}
	initialize() {
    super.initialize()

		this.e.b['edit'] = this.e.content.getElementsByClassName('button edit')[0]
		this.e.b['submit'] = this.e.content.getElementsByClassName('button submit')[0]
		this.e.b['cancel'] = this.e.content.getElementsByClassName('button cancel')[0]

		this.e.t.un = this.e.content.getElementsByClassName('textbox user_name')[0]
		this.e.t.fn = this.e.content.getElementsByClassName('textbox first_name')[0]
		this.e.t.ln = this.e.content.getElementsByClassName('textbox last_name')[0]
		this.e.t.em = this.e.content.getElementsByClassName('textbox e_mail')[0]
		this.e.t.m = this.e.content.getElementsByClassName('textbox mobile')[0]
		this.e.t.pw = this.e.content.getElementsByClassName('textbox pass_word')[0]

		this.e.i['icon'] = this.e.content.getElementsByClassName('icon icon-users')[0]
		this.e.f['icon'] = this.e.content.getElementsByClassName('file')[0]
		this.e.b['icon'] = this.e.content.getElementsByClassName('icon_upload')[0]
  }
	load = load
	handle_click_edit = handle_click_edit
	handle_click_submit = handle_click_submit
	handle_click_cancel = handle_click_cancel
	handle_change_icon = handle_change_icon
	handle_click_logout = handle_click_logout
	handle_click_delete = handle_click_delete
}
