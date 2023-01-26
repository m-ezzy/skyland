function isEmpty(object) {
	return (Object.keys(object).length ? false : true)
}
function getCookie(cookieKey) {
	const decodedCookie = decodeURIComponent(document.cookie) //to be careful
	const cookieArray = decodedCookie.split('; ')
	let value = null
	cookieArray.forEach(e => {
		if (e.indexOf(cookieKey + "=") === 0) {
			value = e.substring(cookieKey.length + 1)
		}
	})
	return value
}
function setCookie(cookieKey, cookieValue, expireDays) {
	const date = new Date()
	date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
	let dateString = date.toUTCString()
	document.cookie = `${cookieKey}=${cookieValue};expires=${dateString};path=/`
}
let fetch_data = async (route, o, fd) => {
	let body = ''
	let headers = {
		'Access-Control-Allow-Origin': '*',
	}

	if(fd) {
		body = o
	} else {
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
		if (Object.keys(o).length) {
			Object.entries(o).forEach(([key, value]) => {
				body += (key + '=' + value + '&')
			})
		}
	}
	let response = await fetch(
		`/api/${route}`, {
			method: 'POST', 
			mode: 'cors', 
			headers: headers, 
			body: body
		}
	)
	let data = await response.json()
	console.log("-----------------fetch-----------------", data)
	return data
}
function create_div(class_name, id, click_handler, text) {
	let e = document.createElement("div")
	if(class_name) e.className = class_name
	/*class_list.forEach(class_name => {
		e.classList.add(class_name)
	})*/
	if(id) e.id = id
	if(click_handler) e.setAttribute("onclick", click_handler)
	e.appendChild(document.createTextNode(text))
	return e
}
function create_image(class_name, id, oc, src, w, h) {
	let e = document.createElement("img")
	e.className = class_name
	e.id = id
	e.setAttribute("onclick", oc)
	e.src = src
	e.setAttribute("width", w)
	e.setAttribute("height", h)
	return e
}
function create_video(class_name, id, oc, src, w, h) {
	let e = document.createElement("video")
	if(class_name) e.className = class_name
	if(id) e.id = id
	if(oc) e.setAttribute("onclick", oc)
	e.setAttribute("controls")
	e.setAttribute("width", w)
	e.setAttribute("height", h)
	let s = document.createElement("source")
	s.src = src
	s.type = 'video/mp4'
	e.appendChild(s)
	return e
}
function create_audio(class_name, id, oc, src) {
	let e = document.createElement("audio")
	if(class_name) e.className = class_name
	if(id) e.id = id
	if(oc) e.setAttribute("onclick", oc)
	e.src = src
	e.setAttribute("controls")
	return e
}
function create_link(class_name, id, href, file_name) {
	let e = document.createElement("a")
	if(class_name) e.className = class_name
	if(id) e.id = id
	e.href = href
	e.setAttribute("download", file_name)
	return e
}
