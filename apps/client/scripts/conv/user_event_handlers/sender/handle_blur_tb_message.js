export default  function() {
	let func = this.handle_keyup
	this.e.content.removeEventListener("keyup", func)
}
