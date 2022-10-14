import { v4 as uuidv4 } from 'uuid';

export const data = [
	{
		id: uuidv4(),
		Type: '자격증',
		Content: '정보 처리 기사',
	},
	{
		id: uuidv4(),
		Type: '학력',
		Content: '부산대학교 졸업',
	},
	{
		id: uuidv4(),
		Type: '학점',
		Content: '3.5',
	},
];

export const port1data = [
	{
		id: uuidv4(),
		Type: 'port1',
		Content: '포트폴리오1',
	},
];

export const port2data = [
	{
		id: uuidv4(),
		Type: 'port2',
		Content: '포트폴리오2',
	},
];
export const port3data = [
	{
		id: uuidv4(),
		Type: 'port3',
		Content: '포트폴리오3',
	},
];

export const columnsFromBackend = {
	origin: {
		title: '나의 데이터',
		items: data,
	},
};
export const port1 = {
	1: {
		title: '포트폴리오 1',
		items: port1data,
	},
};
export const port2 = {
	2: {
		title: '포트폴리오 2',
		items: port2data,
	},
};
export const port3 = {
	3: {
		title: '포트폴리오 3',
		items: port3data,
	},
};
