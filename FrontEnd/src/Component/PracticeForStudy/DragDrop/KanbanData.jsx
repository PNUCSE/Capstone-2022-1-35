// import { v4 as uuidv4 } from 'uuid';
export const data = [
	{
		id: '1',
		Type: '자격증',
		Content: '정보 처리 기사',
	},
	{
		id: '2',
		Type: '학력',
		Content: '부산대학교 졸업',
	},
	{
		id: '3',
		Type: '학점',
		Content: '3.5',
	},
];

export const columnsFromBackend = {
	1: {
		title: '나의 데이터',
		items: data,
	},
	2: {
		title: '자기 소개서',
		items: [],
	},
};
