import { create_div, create_hero } from "../../elements"

export default function(last_id, {conv_id, conv_name, title, extension, ...conv}, members) {
	// this.conv[conv_id].media = new Map()
	// this.media.set(conv_id, new Map())
	this.conv[conv_id] = {
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
		// row_up: last_id,
		// row_down: last_id,
		// time_up: new Date('01/01/1970 00:00:00'),
		// time_down: new Date('01/01/1970 00:00:00'), //new Date('1970-01-01 00:00:00')
		scroll_top: 0,
		media_up: {
			user_id: 0,
			media_id: last_id,
			time_sent: new Date('01/01/1970 00:00:00'),
		},
		media_down: {
			user_id: 0,
			media_id: 0,
			time_sent: new Date('01/01/1970 00:00:00'),
		},
		media: {}
	}
	if(this.names != 'chats') { //OR memers != undefined
		this.conv[conv_id][`${this.name}_id`] = conv_id
		this.conv[conv_id][`${this.name}_name`] = conv_name
		this.conv[conv_id]['members'] = {}
		members.forEach(user => {
			this.add_member(conv_id, user, true)
		})
	}
	let div = create_hero(this.names, conv_id, conv_name, title, extension, `prev_${this.names}_${conv_id}`, `${this.names}.handle_click_prev(${conv_id})`)
	div.classList.add('hover')
	let nmi = create_div('hidden square flex center new_media_indicator', `nmi_${this.names}_${conv_id}`, '', '')
	div.appendChild(nmi)
	// document.getElementsByClassName('content chats')[0].getElementsByClassName('list previous')[0].appendChild(nmi)

	if (this.names != 'channels') {
		this.keys.set(conv_id, '')
		this.e.l.prev.appendChild(div)
	} else {
		let num = this.conv[conv_id].members[account.current.user_id].member_type - 1
		this.e.l.prev.getElementsByClassName('section')[num].classList.remove('hidden')
		this.e.l.prev.getElementsByClassName('section')[num].appendChild(div)
	}
	// document.getElementsByClassName("content chats")[0].getElementsByClassName("bar conversation")[0].appendChild(e)
	// this.conv.push(this.cb.appendChild(e))
}
/*
	let Conv = function() {
		return (
			<div className="conv" id={`conv_chats_${chat_id}`} onscroll={`chats.handle_scroll_conv(${chat_id})`}></div>
		)
	}
	console.log(Conv)
	await ReactDOM.render(<Conv />, this.barc)
*/
