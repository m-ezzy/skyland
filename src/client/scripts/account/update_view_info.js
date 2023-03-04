export default function() {
	console.log(this.all)
	let { user_id, user_name, first_name, last_name, e_mail, mobile, pass_word, extension } = this.all

	this.e.i.icon.src = extension ? `/data/icons/users/${user_id}.${extension}` : '/media/images/place_holder/users.png'
	this.e.t.un.value = user_name
	this.e.t.fn.value = first_name
	this.e.t.ln.value = last_name
	this.e.t.em.value = e_mail
	this.e.t.m.value = mobile
	this.e.t.pw.value = pass_word
}
