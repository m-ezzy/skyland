let fetchs = {
	calls: {},
	chats: {},
	groups: {},
	channels: {},
	account: {}
}

// fetchs will be exactly all the routes of the back-end nothing more nothing less

/*
fetchs = async function(route, body) {
    const response = await fetch(backEnd.pre + route + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: body
    })
	let data = await response.json()
	console.log("fetch : ", data)
    return data
}
*/
