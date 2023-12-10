let current = 1

change_theme = () => {
	document.getElementsByClassName('app')[0].classList.remove('theme' + current)
	current = (current == 14) ? 1 : (current + 1)
	document.getElementsByClassName('app')[0].classList.add('theme' + current)
}

export default 1
