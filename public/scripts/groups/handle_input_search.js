Groups.prototype.handle_input_search = async function() {
	let sections = this.ls.getElementsByClassName('section')
	let lists = this.ls.getElementsByClassName('list')

	Object.entries(sections).forEach(([num, e]) => {
		// if (e.classList.contains('hidden') == false) {
			e.classList.add('hidden')
		// }
	})
	Object.entries(lists).forEach(([num, e]) => {
		e.innerHTML = ''
	})
	this.ls.getElementsByClassName('create_title')[0].value = ''

	let q = this.ts.value
	if (q == "") {
		this.ls.classList.add('hidden')
		return
	}
	this.ls.classList.remove('hidden')

	Object.entries(this.previous).forEach(([group_id, v]) => {
		let match_found = false
		let num = 0

		if( [v.group_name, v.title].includes(q) ) {
			match_found = true
			num = 0
		} else if (v.group_name.search(q) != -1 || v.title.search(q) != -1) {
			match_found = true
			num = 1
		}
		if(match_found) {
			this.ls.getElementsByClassName('section')[num].classList.remove('hidden')
			let hero = this.create_item_hero('groups', group_id, v.group_name, v.title, v.extension, '', `${this.names}.handle_click_search_previous(${group_id})`)
			this.ls.getElementsByClassName('section')[num].getElementsByTagName('div')[1].appendChild(hero)
		}
	})
	let data = await fetch_data(`groups/search_create_new`, {q: q})
	if(data.length == 0) {
		this.ls.getElementsByClassName('section')[2].classList.remove('hidden')
	}
}
