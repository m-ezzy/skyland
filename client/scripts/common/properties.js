import Content from '../content/properties'
import item_hero from './item_hero'

export default class Common extends Content {
  constructor(number, name) {
    super(number, name)
		this.last_known = 1 //to check if history still loading
  }
	initialize() {
		super.initialize()
		
		this.e['bar']['explore'] = this.e.content.getElementsByClassName('bar explore')[0]
		this.e['bar']['conv'] = this.e.content.getElementsByClassName('bar conversation')[0]
		this.e['l']['search'] = this.e.content.getElementsByClassName('list search')[0]
		this.e['l']['prev'] = this.e.content.getElementsByClassName('list previous')[0]
		this.e['l']['conv'] = this.e.content.getElementsByClassName('list conv')[0]
		this.e['b']['back'] = this.e.content.getElementsByClassName('button back')[0]
		this.e['b']['search'] = this.e.content.getElementsByClassName('button search')[0]
		this.e['t']['search'] = this.e.content.getElementsByClassName('text search')[0]
		this.e['header'] = this.e.content.getElementsByClassName('header')[0]
		this.e['sender'] = this.e.content.getElementsByClassName('sender')[0] //sender //send_new_media //controller (for calls)
		this.e['detail']['i'] = this.e.header.getElementsByClassName("image icon")[0]
		this.e['detail']['t'] = this.e.header.getElementsByClassName("title")[0]
		this.e['detail']['cn'] = this.e.header.getElementsByClassName("conv_name")[0]
	}/*
	create_item_hero(...a) {
		let div = create_item_hero.bind(this, ...a).call()
		return div
	}*/
	item_hero = item_hero.bind(this)
}
