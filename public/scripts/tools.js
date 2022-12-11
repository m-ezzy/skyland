/*
function getCookie(cookie_key) {
	const name = cookie_key + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded.split('; ');
	let res = '';
	cArr.forEach(val => {
		if (val.indexOf(name) === 0) {
			res = val.substring(name.length);
		}
	});
	return res;
}*/
let fetchs = async (route, o) => {
	let body = ''
	if(Object.keys(o).length) {
		Object.entries(o).forEach(([key, value]) => {
			body += (key + '=' + value + '&')
		})
	}
	let response = await fetch(backEnd.pre + route + backEnd.suf, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: body
	});
	let data = await response.json()
	console.log("fetch   ", data)
	return data
}
function create_div(className, id, oc, text) {
	let e = document.createElement("div");
	e.className = className;
	e.id = id;
	e.setAttribute("onclick", oc);
	e.appendChild(document.createTextNode(text));
	return e;
}
function create_image(className, id, oc, src, w, h) {
	let e = document.createElement("img");
	e.className = className;
	e.id = id;
	e.setAttribute("onclick", oc);
	e.src = src;
	e.setAttribute("width", w);
	e.setAttribute("height", h);
	return e;
}
