// import Trio from "./properties"

export default async function(conv_id) {
	if ( this.current == conv_id ) {return}
	if (this.current) {
		// document.getElementById(`prev_${this.names}_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`prev_${this.names}_${this.current}`).classList.remove('selected')
		document.getElementById(`conv_${this.names}_${this.current}`).classList.add('hidden')
	} else {
		this.e.bar.conv.classList.remove('hidden')
	}
	this.current = conv_id
	document.getElementById(`prev_${this.names}_${conv_id}`).classList.add('selected')
	document.getElementById(`nmi_${this.names}_${conv_id}`).innerText = ''

	let here = this.names
	let id = conv_id
	if(this.names == 'chats') {
		here = 'users'
		id = this.conv[conv_id].user_id
	}
	let src = (this.conv[conv_id].extension) ? `/data/icons/${here}/${id}.${this.conv[conv_id].extension}` : this.place_holder
	this.e.detail.i.src = src
	this.e.detail.cn.innerText = `@${this.conv[conv_id].conv_name}`
	this.e.detail.t.innerText = this.conv[conv_id].title

	document.getElementById(`conv_${this.names}_${conv_id}`).classList.remove('hidden')
	if (this.conv[conv_id].row_up != 0) {
		this.handle_scroll_conv(conv_id)
	}

	this.e.info.i.src = src
  this.e.info.cn.value = this.conv[conv_id].conv_name
  this.e.info.t.value = this.conv[conv_id].title

	if(['groups', 'channels'].includes(this.names)) {
		if(this.names == 'groups') {
			this.e.l.mem.innerHTML = ''
		} else {
			if (this.conv[conv_id].members[account.current.user_id].member_type == 1) {
				this.e.sender.classList.remove('hidden')
				this.e.bar.info.getElementsByClassName('update_controls')[0].classList.remove('hidden')
			} else {
				this.e.bar.info.getElementsByClassName('update_controls')[0].classList.add('hidden')
				if (this.conv[conv_id].members[account.current.user_id].member_type == 2) {
					this.e.sender.classList.remove('hidden')
				} else {
					this.e.sender.classList.add('hidden')
				}
			}
			Object.values(this.e.l.mem.getElementsByClassName('section')).forEach(e => {
				e.innerHTML = ''
			})
		}
		Object.entries(this.conv[conv_id].members).forEach(([user_id, v]) => {
			this.item_member(conv_id, v)
		})
		if (Object.keys(this.conv[conv_id].members).length == 1) {
			// show label of 'leave and delete' and image of delete instead of leave
		}
	}
	history.pushState('', '', `/${this.names}/${this.conv[conv_id].conv_name}${(this.info_is_open ? '/info' : '')}`)
	/*
	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}*/
}
