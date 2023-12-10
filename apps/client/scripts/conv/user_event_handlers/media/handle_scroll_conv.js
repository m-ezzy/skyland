import { limit } from "../../configs"
import { fetch_data } from '../../clients/api-client'

export default async function() {
	let conv_id = this.current
	// use this everywhere because when you change to other conv it doesnt load since this.current changes
	// learn to use async await properly
	// let conv_id = this.current
	// this.conv[conv_id].scroll_top = this.e.l.media.scrollTop
	if (this.e.l.media.scrollTop != 0) {return}
	// if (this.last_known == 0) {return}
	// this.last_known = 0
	if (this.conv[conv_id].media_up.media_id == 0) {return}

	let row_up = this.conv[conv_id].media_up.media_id
	let data = await fetch_data(`/${this.names}/previous_media`, {conv_id: conv_id, row_up: row_up})
	// sessionStorage.setItem(`${this.names}_messages_${chat_id}`, JSON.stringify(Object.values(data).concat(JSON.parse(sessionStorage.getItem(`${this.names}_messages_${chat_id}`)))))
	this.conv[conv_id].media_up.media_id = (data.length < limit) ? 0 : data[0].media_id
	if(data.length == 0) {return}

	this.conv[conv_id].media_up.time_sent = new Date(data[0].time_sent)
	// this.conv[conv_id].time_down = new Date(data[limit - 1].time_sent)

	let previous_tags = this.e.l.media.innerHTML
	this.e.l.media.innerHTML = ''
	data.forEach(d => {
		this.add_media(d, true)
	})
	this.e.l.media.innerHTML += previous_tags
	// document.getElementById(`media_${this.names}_${data[data.length - 1].media_id}`).scrollIntoView({behavior: "smooth"})
	// document.getElementById(`conv_${this.names}_${conv_id}`).scrollTop = (innerHeight / 20) * (data.length) * 20
	// this.last_known = (innerHeight / 20) * (data.length) * 20
}
