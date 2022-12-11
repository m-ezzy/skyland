class Calls extends Common {
	constructor(number, name) {
	//let Calls = function() {
		super(number, name);

		this.lic;

		this.alc;
		this.vlc;
		this.al;
		this.vl;

		//this.controller //controller //snm
		this.bmic
		this.bce
		//this.bcanvas

		//this.peer_is_open = 0
		this.current = {
			chat_id: 0,
			group_id: 0
		}/*
		this.current = {
			chats: {
				chat_id: 0,
				user_id: 0,
				user_name: ""
			},
			groups: {
				group_id: 0,
				group_name: "",
				title: ""
			}
		}*/

		this.peer = {}
		this.conn = {}
		this.calls = {}   //this.call_incoming //this.call_outgoing

		this.connInterval = ''
		this.callInterval = ''
	}
	initialize() {
        super.initialize()

		this.lic = this.element.getElementsByClassName("list incoming_call")[0]
		this.alc = this.element.getElementsByClassName('local item_media_calls_audio')[0]
		this.vlc = this.element.getElementsByClassName('local item_media_calls_video')[0]
		this.al = this.element.getElementsByClassName('audio local')[0]
		this.vl = this.element.getElementsByClassName('video local')[0]
		this.bce = this.element.getElementsByClassName('button call_end')[0]
    }
}
