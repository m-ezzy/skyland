Channels.prototype.search = async function() {
	let sections = this.ls.getElementsByClassName('section')
	let lists = this.ls.getElementsByClassName('list')

	Object.entries(sections).forEach(([num, e]) => {
		if (e.classList.contains('hidden') == false) {
			e.classList.add('hidden')
		}
	})
	Object.entries(lists).forEach(([num, e]) => {
		e.innerHTML = ''
	})
	this.ls.getElementsByClassName('title')[0].value = ''

	let q = this.ts.value
	if (q == "") {
		this.ls.classList.add("hidden")
		return
	}
	this.ls.classList.remove("hidden")
	/*
	search previous exact
	search previous not exact
	search new exact
	search new not exact
	*/
	let exact_match = false
	/*let exact_match = {
		'where': '',
		'channel_id': 0
	}*/

	let num = -1
	if (Object.keys(this.previous).length) {
		Object.entries(this.previous).forEach(([channel_id, v]) => {
			num = -1
			if (!exact_match && v.channel_name == q) {
				exact_match = true
				num = 0
			} else if ( v.channel_name.search(q) != -1 || v.title.search(q) != -1) {
				num = 1
			}
			if (num != -1) {
				sections[num].classList.remove('hidden')
				let e = this.add_item_search_previous(channel_id, v)
				lists[num].appendChild(e)
			}
		})
	}
	let data = await fetch_data(`channels/search_new`, {q: q})
	if(data.length) {
		data.forEach(v => {
			num = 3
			if (!exact_match && v.channel_name == q) {
				exact_match = true
				num = 2
			}
			sections[num].classList.remove('hidden')
			let e = this.add_item_search_new(v.channel_id, v)
			lists[num].appendChild(e)
		})
	}
	if (!exact_match) {
		sections[4].classList.remove('hidden')
	}
}
