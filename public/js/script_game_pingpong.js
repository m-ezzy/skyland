let game_pingpong = {
	element: document.getElementsByClassName('game_container pingpong')[0],
	width: (innerWidth / 10) * 9,
	height: innerHeight,
}

let num = getCookie('user_id') == 1 ? 0 : 1;

/*some constants declaration*/
const c = document.getElementById("container");
const bar1 = document.getElementsByClassName("bar")[0];
const bar2 = document.getElementsByClassName("bar")[1];
//const m=document.getElementById("message");

//let barx = [0, (game_pingpong.width/10) * 9];

let barMovable = false;

const bar = {
	element: document.getElementsByClassName('bar')[num],
	x: ((game_pingpong.width / 10) * 9) * num,
	y: game_pingpong.height / 5,
	//x: this.element.style.left.split('px')[0],
	//y: this.element.style.top.split('px')[0],
	width: game_pingpong.width / 10,
	height: game_pingpong.height / 5,
	speed: game_pingpong.height / 200,
	sign: 0,
};
const ball = {
	element: document.getElementById('ball'),
	x: game_pingpong.width / 10,
	y: 0,
	sign: {
		x: 1,
		y: 1,
	},
	radius: game_pingpong.width / 20,
	speed: 2,
};

let stopper=0;
let winnerNumber = -1;

let interval;

function running_game() {
	updateBar();
	updateBall();
	//speedIncreaser();
	collisionBallBorder();
	collisionBallBar();
	resultPrinter();
}
function updateBar() {
	let newy;

	if (bar.sign == 0) {
		return;
	}

	newy = bar.y + (bar.sign * bar.speed);
	if (newy < 0) {
		bar.y = 0;
	} else if (newy > (game_pingpong.height - bar.height)) {
		bar.y = game_pingpong.height - bar.height;
	} else {
		bar.y = newy;
	}

	bar.element.style.top = bar.y + 'px';

	//if (previous_bar_y ) {
		//socket.games.emit('send-new-bar-position', {'chat_id': chats.current, 'newy': bar.y});
	//}
}
function updateBall() {
	ball.x += ball.speed * ball.sign.x;
	ball.y += ball.speed * ball.sign.y;

	ball.element.style.left = ball.x + "px";
	ball.element.style.top = ball.y + "px";
}
function collisionBallBorder() {
	if (ball.y <= 0) {
		ball.sign.y = 1;
	} else if (ball.y >= game_pingpong.height - (ball.radius * 2)) {
		ball.sign.y = -1;
	}
}
function collisionBallBar() {
	if (num == 0) {
		if (ball.x <= bar.width) {
			if (ball.y + ball.radius >= bar.y && ball.y + ball.radius <= bar.y + bar.height) {
				ball.sign.x = 1;
			} else {
				winnerNumber = 1;
			}
		}
	} else if (num == 1) {
		if (ball.x + (ball.radius * 2) >= game_pingpong.width - bar.width) {
			if (ball.y + ball.radius >= bar.y && ball.y + ball.radius <= bar.y + bar.height) {
				ball.sign.x = -1;
			} else {
				winnerNumber = 0;
			}
		}
	}
}

function keydown(event) {
	if (event.keyCode == 38) {
		bar.sign = -1;
	} else if (event.keyCode == 40) {
		bar.sign = 1;
    }
}
function keyup(event) {
	bar.sign = 0;

	socket.games.emit('send-new-bar-position', {'chat_id': chats.current, 'newy': bar.y});
}

document.body.addEventListener("keydown", keydown);
document.body.addEventListener("keyup", keyup);

let eventStart = (event) => {
	barMovable = true;
};
let eventMove = (event) => {
	//if (barMovable) {
		//previousY = event.clientY;
		bar.y = event.clientY - (bar.height / 2);
		bar.element.style.top = bar.y + 'px';

		//socket.games.emit('send-new-bar-position', {'chat_id': chats.current, 'newy': bar.y});
	//}
};
let eventEnd = (event) => {
	barMovable = false;

	console.log(bar.y);
	socket.games.emit('send-new-bar-position', {'chat_id': chats.current, 'newy': bar.y});
};

//bar.addEventListener("mouseover", eventStart);
bar.element.addEventListener("mousemove", eventMove);
bar.element.addEventListener("mouseleave", eventEnd);

let touchMove = (event) => {
	bar.y = event.touches[0].clientY - bar.height / 2;
	bar.element.style.top = bar.y + 'px';

	socket.games.emit('send-new-bar-position', {'chat_id': chats.previous[chats.current], 'newy': bar.y});
}

//bar.addEventListener("touchstart", eventMove);
bar.element.addEventListener("touchmove", touchMove);

function resultPrinter() {
	if (winnerNumber != -1) {
		clearInterval(interval);
		alert(winnerNumber + ' player is winner !');
	}
}
