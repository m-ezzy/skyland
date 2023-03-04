import { fetch_data } from '../api-client'

export default async function() {
	let data = await fetch_data('/users/delete', {})
	this.handle_click_logout()
}
