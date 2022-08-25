import { Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export const MyClock = () => {
	const [value, setValue] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<Center flexDirection={'column'}>
			<Clock value={value} />
			<Text fontSize={'2xl'} pt={6}>
				{value.toLocaleTimeString()}
			</Text>
		</Center>
	);
};
