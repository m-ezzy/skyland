import { create_div } from "../tools"

export default function(last_id, {conv_id, conv_name, title, extension, ...conv}, members) {
	// this.conv[conv_id].media = new Map()
	// this.media.set(conv_id, new Map())

	this.conv[conv_id] = {
		// for all
		conv_id: conv_id,
		conv_name: conv_name,
		title: title,
		extension: extension,
		...conv,

		// for chats :
		// user_id
		// first_name
		// last_name
		// deleted_by

		// for channels :
		// user_id

		row_up: last_id,
		row_down: last_id,
		time_up: new Date('01/01/1970 00:00:00'),
		time_down: new Date('01/01/1970 00:00:00'), //new Date('1970-01-01 00:00:00')
		last_media: {
			media_id: last_id,
		},
		media: {}
	}
	if(this.names != 'chats') { //OR memers != undefined
		this.conv[conv_id][`${this.name}_id`] = conv_id
		this.conv[conv_id][`${this.name}_name`] = conv_name
		this.conv[conv_id]['members'] = {}

		members.forEach(m => {
			this.conv[conv_id].members[m.user_id] = {
				...m,
				title: `${m.first_name} ${m.last_name}`,
				// for channels - member_type was in 'm', so no problem
			}
			console.log(this.conv[conv_id].members[m.user_id])
		})
	}

	let hero_type = this.names
	let id = conv_id
	if(this.names == 'chats') {
		hero_type = 'users'
		id = this.conv[conv_id].user_id
	}

	let div = this.item_hero(hero_type, id, conv_name, title, extension, `prev_${this.names}_${conv_id}`, `${this.names}.handle_click_prev(${conv_id})`)
	let nmi = create_div('flex center square new_media_indicator', `nmi_${this.names}_${conv_id}`, '', '')
	div.appendChild(nmi)
	// document.getElementsByClassName('content chats')[0].getElementsByClassName('list previous')[0].appendChild(nmi)

	if (this.names == 'channels') {
		// let member_types = ['founder', 'manager', 'regular']
		// let num = member_types.findIndex(this.conv[conv_id].members[account.current.user_id].member_type)

		let num = this.conv[conv_id].members[account.current.user_id].member_type - 1
		this.e.l.prev.getElementsByClassName('section')[num].classList.remove('hidden')
		this.e.l.prev.getElementsByClassName('section')[num].appendChild(div)
	} else {
		this.e.l.prev.appendChild(div)
	}
}
