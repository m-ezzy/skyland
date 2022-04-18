function show_messages(user_name) {
	let key = parseInt(document.getElementById("TextKey").value);

	if(isNaN(key)) {
		return;
	}

	//console.log(this);
	let ML = document.getElementById("MessagesList");
	ML.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			//ML.innerHTML = this.responseText;

			let result = Array();
			result = JSON.parse(this.responseText);
			
			let i = 0;
			while(o = result[i]) {
			//result.forEach(r => {
				//r.forEach(c => {
				console.log(o);
				let m = decryption(o.message);
				console.log(m);


				let who;
				if(o.sent_by == user_name) {
					who = "MessagesReceived";
				} else {
					who = "MessagesSent";
				}

				/*
				let ne = CreateDivTag(who, m);
				ML.appendChild(ne);
				*/

				let NewElement = document.createElement("div");
				NewElement.className = who;
				//NewElement.id = id;

				let textNode = document.createTextNode(m);
				NewElement.appendChild(textNode);

				ML.appendChild(NewElement);

				//ML.innerHTML += "<div class='MessagesReceived'>" + m + "</div>";
				//});
				
				i++;
			//});
			}
			
			//let mlh = ML.style.height;
			ML.scrollTo(0,99999);

			//CWH.innerHTML = this.innerHTML;

			//A = document.getElementsByClassName("*");
			MS = document.getElementsByClassName("MessagesSent");
			MR = document.getElementsByClassName("MessagesReceived");

			/*
			if(resources) {
				let ci = setInterval(CheckForNewMessages,1000);
			}*/
		}
	};
	xmlhttp.open("POST", "show_messages.php?q=" + user_name, true);
	xmlhttp.send();
}
function send_new_message() {
	console.log(40);

	if(TNM.value == "" || TK.value == "") {
		return;
	}

	let EM = encryption(TNM.value);

	console.log(TNM.value + " " + TK.value);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(41);

			let newDiv = document.createElement("div");
			newDiv.className = "MessagesSent";

			let newText = document.createTextNode(TNM.value);
			newDiv.appendChild(newText);

			ML.appendChild(newDiv);

			/*ML.innerHTML += this.responseText;*/

			ML.scrollBy(0,100);
		}
	};
	xmlhttp.open("POST", "send_new_message.php?q=" + EM, true);
	xmlhttp.send();
}
function check_for_new_messages() {
	if(TK.value == "") {
		return;
	}
	//let RN = <?php echo $_SESSION['RowNumber']?>;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			/*
			let newDiv = document.createElement("div");
			newDiv.className = "MessagesReceived";
			let newText = document.createTextNode(this.responseText);
			newDiv.appendChild(newText);
			content.appendChild(newDiv);
			*/
			//let newRN = <?php echo $_SESSION['RowNumber']?>;
			if(this.responseText != "") {
				//ML.innerHTML += this.responseText;

				const result = JSON.parse(this.responseText);
				result.forEach(r => {
					//r.forEach(c => {
						let dm = decryption(r);

						/*ne = CreateElement("MessagesReceived","NULL",dm);
						ML.appendChild(ne);*/

						ML.innerHTML += "<div class='MessagesReceived'>" + dm + "</div>";
					//});
				});

				ML.scrollBy(0,500);
				/*ML.scrollBottom();
				/*ML.scrollTo(0,500);
				(last div tag in message list).scrollIntoView();*/
			}
		}
	};
	xmlhttp.open("POST", "check_for_new_messages.php", true);
	xmlhttp.send();
}
