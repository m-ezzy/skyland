Calls.prototype.add_item_media_video = function({user_id, user_name, first_name, last_name, extension}) {
// OR
//Calls.prototype.add_item_media_video = function(chat_id) {
	//let {user_id, user_name, first_name, last_name, extension} = chats.previous[chat_id]

	let div = create_div("flex border remote item_media_calls_video", "", "", "")
	let name = create_div("border-bottom sender_specifier", "", "", `${first_name} ${last_name}`)
	let video = document.createElement("video")
	video.id = "video_" + user_id
	video.autoplay = true
	video.muted = true
	video.setAttribute('width', '100%')
	video.setAttribute('height', 'auto')

	div.appendChild(name)
	div.appendChild(video)
	this.lc.appendChild(div)
}
