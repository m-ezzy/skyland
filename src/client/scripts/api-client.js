import configurations from '../../configurations.mjs'

export let fetch_data = async (route, o, fd) => {
	let body = ''
	/*let h = new Headers()
	h.append('Accept', 'application/json')
	console.log(h)*/
	let headers = {
		// 'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Origin': 'http://localhost:8000',
		'Access-Control-Allow-Origin': 'http://localhost:5173',
		// no need to write. i think it is overwritten/added by the browser
	}
	if(fd) {
		// headers['Content-Type'] = 'multipart/form-data'
		body = o
	} else {
		/*
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
		if (Object.keys(o).length) {
			Object.entries(o).forEach(([key, value]) => {
				body += (key + '=' + value + '&')
			})
		}
		console.log(o, body)
		*/
		headers['Content-Type'] = 'application/json'
		body = JSON.stringify(o)
		console.log(o, JSON.stringify(o))
	}
	
	let { protocol, hostname, port, path } = configurations.api_server

	let response = await fetch(
		// talk directly to api server instead of going via vite.js proxy server
		// http://localhost:8000
		// `http://${window.location.hostname}:8000/api${route}`, {
		`${protocol}://${window.location.hostname}:${port}${path}${route}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: headers,
			body: body
		}
	)
	// console.log(response)
	let data = await response.json()
	console.log("-----------------fetch-----------------", data)
	return data
}
