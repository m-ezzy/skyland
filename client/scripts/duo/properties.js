import Trio from '../trio/properties'
import handle_click_call from './handle_click_call'
import handle_click_key from './handle_click_key'
import handle_input_key from './handle_input_key'

export default class Duo extends Trio {
	constructor(number, name) {
		super(number, name)
		this.keys = new Map() //{} //new Map()
		this.encrypt_decrypt = 'decrypt'
	}
	initialize() {
		super.initialize()
		this.e['b']['ca'] = this.e.content.getElementsByClassName('button call audio')[0]
		this.e['b']['cv'] = this.e.content.getElementsByClassName('button call video')[0]
		this.e['b']['key'] = this.e.content.getElementsByClassName('button key')[0]
		this.e['t']['key'] = this.e.content.getElementsByClassName('text key')[0]
	}
	handle_click_call = handle_click_call.bind(this)
	handle_click_key = handle_click_key.bind(this)
	handle_input_key = handle_input_key.bind(this)
}
