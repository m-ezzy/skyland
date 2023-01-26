Account.prototype.get_info = async function() {
  let data = await fetch_data('users/get_info', '')
	this.previous = data.json
	//this.lp.innerHTML = data.html
	console.log(data)
}
