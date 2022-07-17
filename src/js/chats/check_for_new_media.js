
function check_for_new_messages() {
	if(chats.tk.value == "") {
		return;
	}
	//let RN = <?php echo $_SESSION['RowNumber']?>;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "") {
				return;
			}

			let result = new Array()
			result = JSON.parse(this.responseText);
			result.forEach(r => {
				let e;

				let w = Math.floor(innerWidth/5);
				let h = Math.floor(innerHeight/5);

				let first = me.user_name < chats.previous[chats.current].user_name ? me.user_name : chats.previous[chats.current].user_name;
				let second = me.user_name > chats.previous[chats.current].user_name ? me.user_name : chats.previous[chats.current].user_name;

				if (r.message) {
					let m = decryption(r);
					e = create_div("received messages", "", "", m);
				} else if (r.images) {
					e = create_image("received", "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + r.ROWNUM + "." + r.images, w, h);
				} else if (r.videos) {
					e = create_video("received", "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + r.ROWNUM + "." + r.videos, w, h);
				}
				chats.previous[chats.current].conversation.appendChild(e);
				
				chats.previous[chats.current].rows += 1;
			});
			chats.previous[chats.current].conversation.scrollBy(0,500);
			/*chats.previous[chats.current].conversation.scrollBottom();
			/*chats.previous[chats.current].conversation.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/

			if (resources) {
				let ci = setTimeout(check_for_new_messages, 1000);
			}
		}
	};
	xhr.open("POST", "../php/chats/check_for_new_messages.php", true);
	xhr.send();
}
