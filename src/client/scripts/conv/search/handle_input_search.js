import { create_div, create_hero } from "../../elements"
import { fetch_data } from '../../api-client'

/*
search previous exact
search previous not exact
search new exact
search new not exact
*/
export default async function() { //search_previous + search_new //handle_click_search
	let sections = this.e.l.search.getElementsByClassName('section')
	let lists = this.e.l.search.getElementsByClassName('list')

	Object.values(sections).forEach(e => {
		e.classList.add('hidden')
	})
	Object.values(lists).forEach(e => {
		e.innerHTML = ''
	})
	let q = this.e.t.search.value
	if (q == "") {
		this.handle_click_back()
		return
	}
	this.e.l.prev.classList.add('hidden')
	this.e.l.search.classList.remove('hidden')
	
	let match_found = false
	let exact_match_found = false
	// let r = new RegExp('%')

	Object.entries(this.conv).forEach(([conv_id, conv]) => {
		let num = -1
		if( !exact_match_found && [conv.conv_name, conv.title].includes(q) ) {
			exact_match_found = true
			num = 0
		} else if (conv.conv_name.search(q) != -1 || conv.title.search(q) != -1) {
			num = 1
		}
		if(num != -1) {
			match_found = true
			let hero = create_hero(this.names, conv_id, conv.conv_name, conv.title, conv.extension, '', `${this.names}.handle_click_search_previous(${conv_id})`)
			if(this.names == 'chats' && conv.deleted_by == account.current.user_id) {
				num = 4
				let unblock = create_div("flex button border square bg-green unblock", "", `${this.names}.handle_click_unblock(${conv_id})`, 'unblock', true)
				hero.setAttribute('onclick', '')
				hero.appendChild(unblock)
			}
			sections[num].classList.remove('hidden')
			lists[num].appendChild(hero)
		}
	})
	//add banner showing chats with whom no previous communication
	//start //start new //create //create new
	let data = await fetch_data(`/${this.names}/search_new`, {q: q})
	if(this.names == 'chats') {
		let convs = Object.values(this.conv)
		let data2 = data
		data = []
		data2.forEach(d => {
			let match = false
			for(let i = 0 ; i < convs.length ; i++) {
				if(convs[i].user_id == d.conv_id) {
					match = true
					break
				}
			}
			if (!match) {
				data.push(d)
			}
		})
	}
	data.forEach(d => {
		match_found = true
		let num = 3
		if (!exact_match_found && d.conv_name == q) {
			exact_match_found = true
			num = 2
		}
		if(this.names != 'groups') {
			let classes = 'create'
			let click_handler = `chats.handle_click_create_chats(${d.conv_id},'${d.conv_name}','${d.title}','${d.extension}')`
			let text = 'create'
			if(this.names == 'channels') {
				classes = 'add_member'
				click_handler = `channels.handle_click_join(${d.conv_id},'${d.conv_name}','${d.title}','${d.extension}','${d.user_id}')`
				text = 'join'
			}
			let hero = create_hero(this.names, d.conv_id, d.conv_name, d.title, d.extension, '', '')
			let button = create_div(`flex border button square bg-green ${classes}`, '', click_handler, text, true)
			hero.appendChild(button)
			lists[num].appendChild(hero)
			sections[num].classList.remove('hidden')
		}
	})
	if(!exact_match_found || (this.names == 'chats' && !match_found && data.length == 0)) {
		let num = 4
		if(this.names == 'chats') {
			num = 5
		} else {
			this.e.l.search.getElementsByClassName('create_conv_name')[0].value = q
			// this.e.l.search.getElementsByClassName('create_title')[0].value = ''
		}
		sections[num].classList.remove('hidden')
	}
}
