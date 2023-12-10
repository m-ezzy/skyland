export default async function(num) {
	this.e.bar.explore.getElementsByClassName('submenu')[((num == 0) ? 1 : 0)].classList.remove('selected')
	this.e.bar.explore.getElementsByClassName('submenu')[num].classList.add('selected')

	this.e.l.prev.getElementsByClassName("section")[((num == 0) ? 1 : 0)].classList.add("hidden")
	this.e.l.prev.getElementsByClassName("section")[num].classList.remove("hidden")
}
