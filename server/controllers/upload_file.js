import multer from 'multer'

export default multer({
	//dest: './data/temp'
	dest: './public/data/temp'
})

export let get_media_type = (file_name) => {
	let file_types = [
		[],
		[],
		['image', 'jpg', 'jpeg', 'png'],
		['video', 'mp4', 'mkv'],
		['audio', 'mp3'],
		['document', 'pdf', 'doc', 'docx', 'txt', 'html']
	]

	let extension = file_name.split('.')[1]
	// file_name.split(file_name.lastIndexOf('.'))[1]
	// let extension = path.extname(req.files[i].originalname)
	let media_type_id = 5
	for(let j = 2 ; j < file_types.length ; j++) {
		for(let k = 1 ; k < file_types[j].length ; k++) {
			if(file_types[j][k] == extension) {
				media_type_id = j
				break
			}
		}
	}
	return {
		extension: extension,
		media_type_id: media_type_id,
		media_type: file_types[media_type_id][0]
	}
}
