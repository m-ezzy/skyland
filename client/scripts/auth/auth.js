import { getCookie, fetch_data } from "../tools"
document.body.onload = async () => {
	console.log(getCookie('menu'))
	let menu = getCookie('menu') == 'sign_up' ? 'sign_up' : 'log_in'
	window.history.pushState('', '', menu)
	let data = await fetch_data('auth/log_in/load', '')
	document.getElementsByClassName('holder')[0].innerHTML = data.html
}
