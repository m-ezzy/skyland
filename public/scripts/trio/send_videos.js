Trio.prototype.send_videos = async function () {
    Chats_Groups.sending[1].style.visibility = "hidden";

    let xhr = new XMLHttpRequest();
    //let file = document.getElementById('select_videos').files[0];
    let file = this.element.getElementsByClassName("select_videos")[0].files[0];

    let fd = new FormData();
    fd.append("select_videos", file);

    xhr.open("POST", "src/php/this/send_videos.php", true);
    //xhr.setRequestHeader("Content-type","image");
    xhr.send(fd);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let w = Math.floor(innerWidth/5);
            let h = Math.floor(innerHeight/5);
            this.previous[this.current].conversation.appendChild(create_video("sent", "", "", "data/this/chat_between_" + this.responseText, Common.w, Common.h));
            this.previous[this.current].rows += 1;
            this.previous[this.current].conversation.scrollBy(0, 200);
        }
    };
}
