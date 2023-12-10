export default async function(user_id) {
	await this.calls[user_id].close()
	await this.conn[user_id].close()
	delete this.calls[user_id]
	delete this.conn[user_id]
}
