export let configs = {
	resources: true //change to 1 when you work on localhost or when have your own domain
}
let backEnd = {
	lang: 'nodejs',   //"php" //"nodejs"
	pre: '/',   //"../php/routes/" //"/"
	suf: '',   //".php" //""
}
export let screen = {
	mobile: 400,   //innerwidth <= 400 is mobile UI
	tablet: 600,
	monitor: 800
}
export let limit = 20
