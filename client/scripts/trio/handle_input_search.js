import { create_div, fetch_data } from "../tools"

export default async function() {   //search_previous + search_new
	let sections = this.e.l.search.getElementsByClassName('section')
	let lists = this.e.l.search.getElementsByClassName('list')

	Object.values(sections).forEach(e => {
		// if (e.classList.contains('hidden') == false) {
			e.classList.add('hidden')
		// }
	})
	Object.values(lists).forEach(e => {
		e.innerHTML = ''
	})
	let q = this.e.t.search.value
	if (q == "") {
		this.handle_click_back()
		//this.ls.style.display = "none";
		//this.ls.style.display = "block"
		//this.ls.innerHTML = ""
		return
	}
	this.e.l.prev.classList.add('hidden')
	this.e.l.search.classList.remove('hidden')
	/*
	search previous exact
	search previous not exact
	search new exact
	search new not exact
	*/
	let count = 0
	let exact_match_found = false

	let hero_type = this.names
	let id = 'conv_id'
	if(this.names == 'chats') {
		hero_type = 'users'
		id = 'user_id'
	}

	// let r = new RegExp('%')

	if (Object.keys(this.conv).length) {
		Object.entries(this.conv).forEach(([conv_id, conv]) => {
			let num = -1

			console.log(this.conv, conv_id, conv)
			if ( !exact_match_found && [conv.conv_name, conv.title].includes(q) ) {
				exact_match_found = true
				num = 0
			} else if (conv.conv_name.search(q) != -1 || conv.title.search(q) != -1) {
				num = 1
			}
			if(num != -1) {
				count++
				let hero = this.item_hero(hero_type, conv[id], conv.conv_name, conv.title, conv.extension, '', `${this.names}.handle_click_search_previous(${conv_id})`)

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
	}
	let data = await fetch_data(`/${this.names}/search_new`, {q: q})

	if(this.names == 'chats') {
		//add banner showing chats with whom no previous communication
		//start //start new //create //create new
		if (data.length) {
			let p = Object.values(this.conv)
			let create = []

			data.forEach(d => {
				let match = false
				for (let j = 0 ; j < p.length ; j++) {
					if (p[j].user_id == d.user_id) {
						match = true
						break
					}
				}
				if (!match) {
					count++
					let num = 3
					if (!exact_match_found && d.user_name == q) {
						exact_match_found = true
						num = 2
					}
					sections[num].classList.remove('hidden')
					let hero = this.item_hero('users', d.user_id, d.user_name, `${d.first_name} ${d.last_name}`, d.extension, '', '')
					let create = create_div("flex button border square bg-green create", "", `${this.names}.handle_click_create(${d.user_id},'${d.user_name}','${d.first_name}','${d.last_name}','${d.extension}')`, 'create')
					hero.appendChild(create)
					lists[num].appendChild(hero)
				}
			})
		}
		if (count == 0) {
			sections[5].classList.remove('hidden')
		}
	} else if (this.names == 'groups') {
		if(data.length) {
			data.forEach(d => {
				if (!exact_match_found && d.group_name == q) {
					exact_match_found = true
				}
			})
		}
		if(!exact_match_found) {
			this.e.l.search.getElementsByClassName('create_conv_name')[0].value = q
			// this.e.l.search.getElementsByClassName('create_title')[0].value = ''
			sections[2].classList.remove('hidden')
		}
	} else if (this.names == 'channels') {
		if(data.length) {
			data.forEach(v => {
				let num = 3
				if (!exact_match_found && v.channel_name == q) {
					exact_match_found = true
					num = 2
				}
				sections[num].classList.remove('hidden')
				let hero = this.item_hero('channels', v.channel_id, v.channel_name, v.title, v.extension, '', '')
				let join = create_div('flex border button square bg-green add_member', '', `channels.handle_click_join(${v.channel_id},'${v.channel_name}','${v.title}','${v.extension}')`, 'join', true)
				hero.appendChild(join)
				lists[num].appendChild(hero)
			})
		}
		if (!exact_match_found) {
			this.e.l.search.getElementsByClassName('create_conv_name')[0].value = q
			// this.e.l.search.getElementsByClassName('create_title')[0].value = ''
			sections[4].classList.remove('hidden')
		}
	}
}
