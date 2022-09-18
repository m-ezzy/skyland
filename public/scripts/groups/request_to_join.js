groups.request_to_join = async function(group_id) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            search_results_hidden();
        }
    };
    xhr.open("POST", "../php/" + this.who + "/send_request_to_join.php?q=" + group_id, true);
    xhr.send();
}
