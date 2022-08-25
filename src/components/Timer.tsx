import {
	Center,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Text,
	Button,
	Flex,
	Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatTime } from '../util';

const InputNumber = ({
	value,
	onChange,
	max,
}: {
	value: number;
	onChange: (value: number) => void;
	max: number;
}) => {
	return (
		<NumberInput
			defaultValue={0}
			min={0}
			max={max}
			onChange={(_v, v) => onChange(v)}
			value={value}
		>
			<NumberInputField />
			<NumberInputStepper>
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
		</NumberInput>
	);
};

export const Timer = () => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [targetSeconds, setTargetSeconds] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	const start = () => {
		setTargetSeconds(hours * 3600 + minutes * 60 + seconds);
		setIsRunning(true);
		setIsPaused(false);
		setIsComplete(false);
	};
	const pause = () => {
		setIsPaused(true);
	};
	const resume = () => {
		setIsPaused(false);
	};
	const stop = () => {
		setIsRunning(false);
		setIsPaused(false);
		setIsComplete(false);
	};
	useEffect(() => {
		if (!isRunning || isPaused) return;
		const interval = setInterval(() => {
			const newSeconds = targetSeconds - 1;
			if (newSeconds < 0) {
				setIsComplete(true);
				return;
			}
			setTargetSeconds(newSeconds);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [isRunning, isPaused, targetSeconds]);
	useEffect(() => {
		if (!isComplete) return;
		// play sound
		const audio = new Audio('./assets/alarm.mp3');
		audio.play();
	}, [isComplete]);
	return (
		<Center flexDirection={'column'}>
			{isRunning ? (
				<Flex flexDir={'column'} gap={4}>
					{isComplete ? (
						<Heading>Complete!</Heading>
					) : (
						<>
							<Heading>{formatTime(targetSeconds)}</Heading>
							<Button onClick={isPaused ? resume : pause}>
								{isPaused ? 'Resume' : 'Pause'}
							</Button>
						</>
					)}
					<Button onClick={stop}>Stop</Button>
				</Flex>
			) : (
				<>
					<Text>Hours</Text>
					<InputNumber value={hours} onChange={setHours} max={23} />
					<Text>Minutes</Text>
					<InputNumber
						value={minutes}
						onChange={setMinutes}
						max={59}
					/>
					<Text>Seconds</Text>
					<InputNumber
						value={seconds}
						onChange={setSeconds}
						max={59}
					/>
					<Button mt={4} onClick={start}>
						Start
					</Button>
				</>
			)}
		</Center>
	);
};
