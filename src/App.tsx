import {
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import { MyClock as Clock } from './components/Clock';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';

export const App = () => {
	return (
		<Container>
			<Tabs align="center">
				<TabList>
					<Tab>Clock</Tab>
					<Tab>Timer</Tab>
					<Tab>Stopwatch</Tab>
				</TabList>

				<TabPanels pt={4}>
					<TabPanel>
						<Clock />
					</TabPanel>
					<TabPanel>
						<Timer />
					</TabPanel>
					<TabPanel>
						<Stopwatch />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};
