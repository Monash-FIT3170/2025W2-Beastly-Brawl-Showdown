import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ActionButton from './ActionButton';

const socket = io('http://localhost:3001'); 
const actions = ['Attack', 'Defend', 'Ability 1', 'Ability 2'];


const ChoosePlayerMove: React.FC = () => {
	const [log, setLog] = useState<string[]>([]);

	useEffect(() => {
	socket.on('action_log', (messages: string[]) => {
		setLog(prev => [...prev, ...messages]);
	});

	return () => {
		socket.off('action_log');
	};
	}, []);


	const handleClick = (action: string) => {
	socket.emit('player_action', action);
	};

	return (
	<div>
		<h2>Choose Your Move</h2>
		{actions.map((action) => (
		<div key={action}>
			<ActionButton label={action} onClick={() => handleClick(action)} />
		</div>
		))}

		<div>
		<h3>Game logs</h3>
		<ul>
			{log.map((msg) => (
			<li>{msg}</li>
			))}
		</ul>
		</div>
	</div>
	);
};

export default ChoosePlayerMove;

