import { fetch_data } from "./clients/api-client"

// new RegExp()

export function pass_word(pass_word) {
	let validation = []
	validation[0] = pass_word.length > 7 ? true : false
	validation[1] = pass_word.length < 21 ? true : false
	validation[2] = (new RegExp('[0-9]')).test(pass_word)
	validation[3] = (new RegExp('[a-zA-Z]')).test(pass_word)
	// validation[3] = (new RegExp('[a-z]')).test(pass_word)
	// validation[4] = (new RegExp('[A-Z]')).test(pass_word)
	// validation[4] = (new RegExp("\t\r\n")).test(pass_word)
	// validation[4] = (new RegExp('@!£$%&')).test(pass_word)
	return validation
}
export async function conv_name(conv_name, names) {
	let validation = []
	validation[0] = conv_name.length > 0 ? true : false
	validation[1] = conv_name.length < 41 ? true : false
	validation[2] = !(conv_name.includes(' '))

	if(conv_name == '') {
		validation[3] = false
	} else {
		validation[3] = await fetch_data(`/${names}/check_conv_name`, {conv_name: conv_name})
	}
	return validation
}
export function title(title) {
	let validation = []
	validation[0] = title.length > 0 ? true : false
	validation[1] = title.length < 41 ? true : false
	return validation
}
export function first_last_name(title) {
	let validation = []
	validation[0] = title.length > 0 ? true : false
	validation[1] = title.length < 21 ? true : false
	return validation
}

export let e_mail = new RegExp()
export let mobile = new RegExp()

export function icon_size(size) {
	return (size <= 1024 * 1024 * 5) //MB
}
export function media_file_size(size) {
	return (size <= 1024 * 1024 * 50) //MB
}
export function media_files_length(length) {
	return (length < 10)
}
