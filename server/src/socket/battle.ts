import http from 'node:http';
import { Server } from 'socket.io';
import { FakeBattle } from '../model/game/fakebattle';

export function startBattle() {
	const server = http.createServer();
	const PORT = 3001;
	const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
	});

	const battle = new FakeBattle();

	io.on('connection', (socket) => {
	battle.addPlayer(socket.id, `Player ${socket.id.slice(0, 4)}`);

	socket.on('player_action', (action ) => {
		const results = battle.submitAction(socket.id, action);

		if (results) {
		io.emit('action_log', results);
		}
	});

	socket.on('disconnect', () => {
		battle.removePlayer(socket.id);
	});
	});

	server.listen(PORT, () => {
	});
}
