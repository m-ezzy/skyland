import { content } from "./index"

export function create_div(class_name, id, click_handler, text, tooltip) {
	let e = document.createElement("div")
	if(class_name) e.className = class_name
	/*class_list.forEach(class_name => {
		e.classList.add(class_name)
	})*/
	if(id) e.id = id
	if(click_handler) e.setAttribute("onclick", click_handler)
	e.appendChild(document.createTextNode(text))
	if(tooltip) e.setAttribute('data-tooltip', text)
	return e
}
export function create_image(class_name, id, oc, src) {
	let e = document.createElement("img")
	e.className = class_name
	e.id = id
	e.setAttribute("onclick", oc)
	e.src = src
	// e.setAttribute("width", w)
	// e.setAttribute("height", h)
	return e
}
export function create_video(class_name, id, oc, src, type) {
	let e = document.createElement("video")
	if(class_name) e.className = class_name
	if(id) e.id = id
	if(oc) e.setAttribute("onclick", oc)
	e.setAttribute("controls", true)
	// e.setAttribute("width", w)
	// e.setAttribute("height", h)
	let source = document.createElement("source")
	source.src = src
	source.type = `video/${type}`
	e.appendChild(source)
	return e
}
export function create_audio(class_name, id, oc, src) {
	let e = document.createElement("audio")
	if(class_name) e.className = class_name
	if(id) e.id = id
	if(oc) e.setAttribute("onclick", oc)
	e.src = src
	e.setAttribute("controls", true)
	return e
}
export function create_link(class_name, id, href, file_name) {
	let e = document.createElement("a")
	if(class_name) e.className = class_name
	if(id) e.id = id
	e.href = href
	e.setAttribute("download", file_name)
	return e
}
export function create_location(class_name, id, text) {
	let e = document.createElement("div")
	let latitude = text.split('and')[0]
	let longitude = text.split('and')[1]
	if(class_name) e.className = class_name
	if(id) e.id = id
	return e
}
export function create_hero(names, conv_id, conv_name, title, extension, tag_id, click_handler, search) { //item_hero
	let place_holder = {
		users: "/media/images/place_holder/users.png",
		groups: "/media/images/place_holder/groups.png",
		channels: "/media/images/place_holder/channels.png"
	}
	if(names == 'chats') {
		names = 'users'
		if(!search) {
			conv_id = chats.conv[conv_id].user_id
		}
		// error when searching for new chats since not in chats yet
	}

	//let img = create_image("", "", "", `data/icons/users/${user_id}.${extension}`);
	//div.style.backgroundImage = `url(data/icons/users/${user_id}.${extension})`

	let src = (extension == null) ? place_holder[names] : `/data/icons/${names}/${conv_id}.${extension}`
	// let src = content.instances[names].icon_src(conv_id)

	let div = create_div('padding flex col-gap border-b hero prev', tag_id, click_handler, '')
	// let icon = create_image(`border square image icon icon-${names == 'chats' ? 'users' : names}`, '', '', src, '', '')
	let icon = create_image(`border square image icon icon-${names}`, '', '', src, '', '')
	// let text = document.createTextNode(`${first_name} ${last_name}`)
	// let text = `<div><div>${first_name} ${last_name}</div><div class='name'>@${user_name}</div></div>`
	let holder = create_div('flex-grow-2', '', '', '') //flex-grow-2 //margin-l-a
	let t = create_div('title', '', '', title)
	let cn = create_div('conv_name', '', '', `@${conv_name}`)

	// prev.appendChild(text)
	// prev.innerHTML += text
	holder.appendChild(t)
	holder.appendChild(cn)
	div.appendChild(icon)
	div.appendChild(holder)
	return div
}
