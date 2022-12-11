Trio.prototype.send_images = async function () {
	Chats_Groups.sending[0].style.visibility = "hidden";

	const fd = new FormData();
	let all_files = document.getElementsByClassName("select_images")[0];
	fd.append("select_images", all_files.files[0]);
	fd.append("id", this.current);

	let text = "";
	let response = await fetch(backEnd.pre + this.who + "/send_images" + backEnd.suf, {
		method: 'POST',
		body: fd
	})
	.then((response) => response.text())
	.then((value) => {
		text = value;

		this.conversation[this.current].appendChild(create_image("sent", "", "", "data/" + this.who + "/" + text, Common.w, Common.h));
		this.previous[this.current].rows += 1;
		this.conversation[this.current].scrollBy(0, 200);
	});
}
