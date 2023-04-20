import { h, render } from 'preact';
import './style';

const OFFLINE_THRESHOLD_MS = 3000;

class API {
	ws = null;

	constructor() {
		this.ws = new WebSocket("ws://192.168.4.1/ws");

		this.ws.onopen = () => setTimeout(() => {
			this.ws.send('on');

			window.emitter.on('send', (data) => {
				this.ws.send(data);
			});
		}, 300);

		this.ws.onmessage = (e) => {
			try {
				const {data} = e;
				const {type, content} = JSON.parse(data);

				if (type === 'ok') {
					Object.assign(window.store, {
						isLoading: false,
						isOnline: true,
					})
				}

				if (type === 'system') eval(content);
				if (type === 'debug') console.log(content);

				if (type === 'update') {
					Object.assign(window.store, content, {
						update: Date.now(),
						isLoading: false,
						isOnline: true,
					});

					window.emitter.emit('refresh', null, true)
				}
			} catch (e) { alert(e) }
		};

		const updateTemperature = (t = window.store.t) => {
			window.emitter.emit('update', { isOffline: (window.store.update || Date.now()) - Date.now() > OFFLINE_THRESHOLD_MS })

			let temperature = parseInt(t)
			if (temperature < 25) temperature = 25
		};

		setInterval(() => {
			updateTemperature()
		}, 500)

		// startButton.addEventListener('click', () => {
		// 	this.ws.send('heat');
		// });


		// this.ws.send('set t=' + value);
	}
}

let root, api;
function init() {
	let App = require('./components/app').default;
	root = render(<App />, document.body, root);
	api = new API();
}

if (process.env.NODE_ENV === 'production') {
	require('./pwa');
}

if (module.hot) {
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
