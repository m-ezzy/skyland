function ShowMessages(UserName) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			//ML.innerHTML = this.responseText;

			const result = JSON.parse(this.responseText);
			result.forEach(r => {
				//r.forEach(c => {
				let m = decryption(r.message);

				let who;
				if(r.sent_by == UserName) {
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
			});
			
			//let mlh = ML.style.height;
			ML.scrollTo(0,99999);

			PH.innerHTML = UserName;

			//A = document.getElementsByClassName("*");
			MS = document.getElementsByClassName("MessagesSent");
			MR = document.getElementsByClassName("MessagesReceived");

			if(server == "localhost") {
				let ci = setInterval(CheckForNewMessages,1000);
			}
		}
	};
	xmlhttp.open("POST", "ShowMessages.php?q=" + UserName, true);
	xmlhttp.send();
}
function SendNewMessage() {
	if(TNM.value == "" || TK.value == "") {
		return;
	}

	let EM
	EM = encryption(TNM.value);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			let newDiv = document.createElement("div");
			newDiv.className = "MessagesSent";
			let newText = document.createTextNode(TNM.value);
			newDiv.appendChild(newText);
			ML.appendChild(newDiv);

			/*ML.innerHTML += this.responseText;*/

			ML.scrollBy(0,100);
		}
	};
	xmlhttp.open("POST", "SendNewMessage.php?q=" + EM, true);
	xmlhttp.send();
}
function CheckForNewMessages() {
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
	xmlhttp.open("POST", "CheckForNewMessages.php?", true);
	xmlhttp.send();
}
