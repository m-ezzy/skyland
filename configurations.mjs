export default {
	database: {
		protocol: "http",
		hostname: "localhost",
		port: 3306,
		username: "root",
		password: "",
		dbname: "skyland",
	},
	api_server: {
		protocol: "http",
		hostname: "localhost",
		port: 8000,
		path: "/api",
	},
	socket_server: {
		protocol: "http", //http //https //ws //wss //window.location.protocol
		hostname: "localhost", //localhost //window.location.hostname
		port: 7000, //5173 //8000 //8001 //7000 //window.location.port
		path: "", //'' //'/socket' //'/conv'
	},
	peer_server: {
		protocol: "http",
		hostname: "localhost",
		port: 9000, //80 //443 //8000
		path: "/peer",
		PREFIX: 'skyland-', //'murtaza-oca-' //skyland- //''
	},
	client: {
		protocol: "http",
		hostname: "localhost",
		port: 5173,
		path: "/",
	}
}
