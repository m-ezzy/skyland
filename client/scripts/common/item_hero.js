import Content from "../content/properties"
// import Common from "../common/properties"
import { create_div, create_image } from "../tools"

export default function(which, conv_id, conv_name, title, extension, tag_id, click_handler) {
	console.log(which, conv_id, conv_name, title, extension, tag_id, click_handler)
	let src = (extension == null) ? Content.place_holder[which] : `/data/icons/${which}/${conv_id}.${extension}`

	let div = create_div('padding flex col-gap border-b hero prev', tag_id, click_handler, '')
	let icon = create_image(`border square image icon icon-${which}`, '', '', src, '', '')
	// let text = document.createTextNode(`${first_name} ${last_name}`)
	// let text = `<div><div>${first_name} ${last_name}</div><div class='name'>@${user_name}</div></div>`
	let holder = create_div('flex-grow-2', '', '', '') //flex-grow-2 //margin-l-a
	let t = create_div('title', '', '', title)
	let un = create_div('conv_name', '', '', `@${conv_name}`)

	// prev.appendChild(text)
	// prev.innerHTML += text
	holder.appendChild(t)
	holder.appendChild(un)
	div.appendChild(icon)
	div.appendChild(holder)
	return div
}
