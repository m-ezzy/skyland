export default function() {
	cookieStore.delete({
		name: "user_id",
	})
	location.reload()
}
