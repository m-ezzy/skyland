groups.add_member = async function() {
    let member = this.tam.value;

    const response = await fetch(backEnd.pre + "groups/add_member" + backEnd.suf, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: `group_id=${this.current}&member=${member}`});
    let data = await response.json();

    this.ch.getElementsByClassName('details')[0].innerHTML += this.tam.value + " , ";
}
