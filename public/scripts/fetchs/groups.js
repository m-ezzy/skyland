fetchs.groups.create_new = async (group_name, title) => {
    const response = await fetch(backEnd.pre + "groups/create_new" + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `group_name=${group_name}&title=${title}` })
	let data = await response.json()
    return data
}
fetchs.groups.send_message = async (group_id, encrypted_message) => {
    let response = await fetch(backEnd.pre + 'groups/send_message' + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `group_id=${group_id}&encrypted_message=${encrypted_message}`
    });
    let data = await response.json();
    return data
}
fetchs.groups.add_member = async (group_id, user_id) => {   //add_member //join
    const response = await fetch(backEnd.pre + "groups/add_member" + backEnd.suf, {
        method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `group_id=${group_id}&member_id=${user_id}` })
    let data = await response.json()
	console.log("fetch   ", data)
    return data
}
fetchs.groups.leave = async (group_id) => {
    const response = await fetch(backEnd.pre + "groups/leave" + backEnd.suf, {
        method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `group_id=${group_id}` })
    let data = await response.json()
	console.log("fetch   ", data)
    return data
}
