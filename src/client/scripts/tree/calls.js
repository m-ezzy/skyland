import Common from './common'

import load from '../calls/load'

import handle_click_call from '../calls/user-events-handlers/handle_click_call'
import handle_click_accept from '../calls/user-events-handlers/handle_click_accept'
import handle_click_decline from '../calls/user-events-handlers/handle_click_decline'
import handle_click_speaker from '../calls/user-events-handlers/handle_click_speaker'
import handle_click_mic from '../calls/user-events-handlers/handle_click_mic'
import handle_click_camera from '../calls/user-events-handlers/handle_click_camera'
import handle_click_end from '../calls/user-events-handlers/handle_click_end'

export default class Calls extends Common {
	constructor(number, name) {
	//let Calls = function() {
		super(number, name)
		this.e['media'] = {}
		this.e['local'] = {}

		//this.controller //controller //snm
		this.bmic
		this.bce
		//this.bcanvas

		//this.peer_is_open = 0
		this.current = 0
		/*this.current = {
			names: '',
			conv_id: 0,
			call_type: ''
		}*/
		/*this.current = {
			chat_id: 0,
			group_id: 0
		}*//*
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

		this.is_on = {
			speaker: true,
			mic: false,
			camera: false
		}
	}
	initialize() {
    super.initialize()

		this.e.l['ic'] = this.e.content.getElementsByClassName("list incoming_call")[0]
		this.e['media']['audio'] = this.e.content.getElementsByClassName('local media_calls_audio')[0]
		this.e['media']['video'] = this.e.content.getElementsByClassName('local media_calls_video')[0]
		this.e['local']['audio'] = this.e.content.getElementsByClassName('local tag_audio')[0]
		this.e['local']['video'] = this.e.content.getElementsByClassName('local tag_video')[0]
		this.e.b['speaker'] = this.e.content.getElementsByClassName('button toggle_speaker')[0]
		this.e.b['mic'] = this.e.content.getElementsByClassName('button toggle_mic')[0]
		this.e.b['camera'] = this.e.content.getElementsByClassName('button toggle_camera')[0]
		this.e.b['end'] = this.e.content.getElementsByClassName('button call_end')[0]

		this.e.sound['cr'] = document.getElementsByClassName('sound calls_ringing')[0]
  }
	load = load

	handle_click_call = handle_click_call
	handle_click_accept = handle_click_accept
	handle_click_decline = handle_click_decline
	handle_click_speaker = handle_click_speaker
	handle_click_mic = handle_click_mic
	handle_click_camera = handle_click_camera
	handle_click_end = handle_click_end
}
