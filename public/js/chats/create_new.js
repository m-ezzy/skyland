Chats.prototype.create_new = async function(user_id, user_name, first_name, last_name, extension) {
    this.sr.style.display = 'none';

    const response = await fetch(backEnd.pre + this.who + "/create_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id2=' + user_id});
    let data = await response.json();
    console.log(data);

    this.previous[data.chat_id] = {'user_id': user_id, 'user_name': user_name, 'first_name': first_name, 'last_name': last_name, 'extension': extension, 'row_up': 0, 'row_down': data.row_down};

    let img_src = ((extension == 'null') ? this.place_holder : `data/icons/chats/${user_id}.${extension}`);
    let text = `${user_id} , ${user_name} , ${first_name} , ${last_name}`;

    this.new_previous_entry(data.chat_id, text, img_src);

    //let e = document.getElementById(this.who + "_" + data.chat_id);
    //this.conversation.push(e);
    //this.conversation = this.cb.getElementsByClassName('conversation');
    //let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];

    this.show_conversation(this.pl.lastElementChild, data.chat_id);
}
