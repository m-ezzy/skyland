import do_toggle_update from './do_toggle_update'
import update_view_info from './update_view_info'

export default function() {
	do_toggle_update.call(this)
	update_view_info.call(this)
}
