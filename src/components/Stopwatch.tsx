import { Box, Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatTime } from '../util';

export const Stopwatch = () => {
	const [secondsElapsed, setSecondsElapsed] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const start = () => {
		setIsRunning(true);
	};
	const stop = () => {
		setIsRunning(false);
	};
	const reset = () => {
		setSecondsElapsed(0);
		setIsRunning(false);
	};
	useEffect(() => {
		if (!isRunning) return;
		const interval = setInterval(() => {
			setSecondsElapsed(secondsElapsed + 1);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [isRunning, secondsElapsed]);
	return (
		<Box>
			<Heading>{formatTime(secondsElapsed)}</Heading>
			<ButtonGroup pt={4}>
				<Button onClick={isRunning ? stop : start}>
					{isRunning ? 'Stop' : 'Start'}
				</Button>
				<Button onClick={reset}>Reset</Button>
			</ButtonGroup>
		</Box>
	);
};
