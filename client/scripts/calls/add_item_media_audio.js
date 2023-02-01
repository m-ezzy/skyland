Calls.prototype.add_item_media_audio = function({user_id, user_name, first_name, last_name, extension}) {
	let div = create_div("item_media_calls audio", "", "", "")
	let name = create_div("", "", "", `${first_name} ${last_name}`)

	let img = document.createElement("img");
	img.src = extension ? `data/icons/users/${user_id}.${extension}` : this.placeholder
	//let img = create_image("", "", "", `data/icons/users/${user_id}.${extension}`);
	//div.style.backgroundImage = `url(data/icons/users/${user_id}.${extension})`
	
	let audio = document.createElement("audio")
	audio.id = "audio_" + user_id
	audio.autoplay = true
	audio.muted = true
	/*audio.width = "100%"
	audio.height = "auto"*/

	div.appendChild(name)
	div.appendChild(audio)
	this.lc.appendChild(div)
}
