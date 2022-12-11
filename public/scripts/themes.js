/*
bg - '#ADEFD1FF'   text - '#00203FFF' (project documentation)
bg - '#184A45FF'   text - '#b2d8d8'
*/
let theme = {
	current: -1,
	colors: {
		mb_bg: ['rgb(255, 36, 91)', 'rgb(30, 240, 170)', '#184A45FF', '#808080', '#808080', '#101820FF', '#F96167', '#CCF381', '#000000', "#e9ab18", "#845EC2", "#36b336", "#5f1b72"],
		lb_bg: ['rgb(255, 106, 155)', 'rgb(130, 240, 190)', '#184A45FF', '#808080', '#808080', '#101820FF', '#F96167', '#CCF381', '#000000', "#efc050", "#A178DF", "#4dff4d", "#a730c9"],
		cb_bg: ['rgb(255, 183, 201)', 'rgb(180, 240, 210)', '#184A45FF', '#808080', '#808080', '#101820FF', '#F96167', '#CCF381', '#000000', "#f5d997", "#BE93FD", "#a6ffa6", "#cc83e1"],

		text: ['#000000', '#00203FFF', '#b2d8d8', '#00ff99', '#00ffff', '#F2AA4CFF', '#FCE77D', '#4831D4', '#ffffff', "#000000", "#ffffff", "#000000", "#000000"],

		item_hover_bg: ['rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)'],
		item_selected_bg: ['rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)', 'rgb(190, 190, 190)'],

		text_box_bg: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
		text_box_text: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', "#000000", "#000000", "#000000", "#000000"],
	},
	change: () => {
		theme.current = (theme.current == theme.colors.mb_bg.length - 1) ? 0 : (theme.current + 1);

		let r = document.querySelector(':root');
		r.style.setProperty('--bg-mb', theme.colors.mb_bg[theme.current]);
		r.style.setProperty('--bg-eb', theme.colors.lb_bg[theme.current]);
		r.style.setProperty('--bg-cb', theme.colors.cb_bg[theme.current]);
		r.style.setProperty('--text', theme.colors.text[theme.current]);
		r.style.setProperty('--item-hover-bg', theme.colors.item_hover_bg[theme.current]);
		r.style.setProperty('--item-selected-bg', theme.colors.item_selected_bg[theme.current]);
		r.style.setProperty('--text-box-bg', theme.colors.text_box_bg[theme.current]);
		r.style.setProperty('--text-box-text', theme.colors.text_box_text[theme.current]);
	}
}
