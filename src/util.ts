// format time into HH:MM:SS
export const formatTime = (seconds: number) =>
	new Date(seconds * 1000).toISOString().slice(11, 19);
