import { createSlice } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectLoginData } from 'Redux/LoginCheck';

import { TestURL } from 'domainBox';
import { TestLoginURL } from 'domainBox';
// import { KakaoRedirectURL } from 'domainBox';
// import { ServerURL } from 'domainBox';

export const loadBlockFromServer = {
	awardDtoList: [
		{
			type: 'AWARD',
			id: 'AWARD-0101',
			title: '아이디어 공모전',
			ownerId: 1,
			publisher: 'org1',
			publishedAt: '123123123',
			createAt: '123123123',
			rank: '우수',
		},
		{
			type: 'AWARD',
			id: 'AWARD-0102',
			title: '졸업과제',
			ownerId: 1,
			publisher: 'org2',
			publishedAt: "yyyy-MM-dd'T'HH:mm:ss",
			createAt: "yyyy-MM-dd'T'HH:mm:ss",
			rank: '1등',
		},
	],
	educationDtoList: [
		{
			type: 'EDUCATION',
			id: 'EDUCATION-0101',
			title: '대학교',
			ownerId: 1,
			publisher: 'org11',
			publishedAt: "yyyy-MM-dd'T'HH:mm:ss",
			createAt: "yyyy-MM-dd'T'HH:mm:ss",
			state: '졸업예정',
			departmentInfo: '부산대',
		},
		{
			type: 'EDUCATION',
			id: 'EDUCATION-0102',
			title: '고등학교',
			ownerId: 1,
			publisher: 'org12',
			publishedAt: "yyyy-MM-dd'T'HH:mm:ss",
			createAt: "yyyy-MM-dd'T'HH:mm:ss",
			state: '졸업',
			departmentInfo: '동래고',
		},
	],
	licenseDtoList: [
		{
			type: 'LICENSE',
			id: 'LICENSE-0101',
			title: '빅분기',
			ownerId: 1,
			publisher: 'org31',
			publishedAt: "yyyy-MM-dd'T'HH:mm:ss",
			createAt: "yyyy-MM-dd'T'HH:mm:ss",
			description: '빅데이터 분석기사 수석 합격',
			expireDate: "yyyy-MM-dd'T'HH:mm:ss",
			qualificationNumber: 'bdbd-alal',
		},
		{
			type: 'LICENSE',
			id: 'LICENSE-0102',
			title: 'OPIC',
			ownerId: 1,
			publisher: 'org32',
			publishedAt: "yyyy-MM-dd'T'HH:mm:ss",
			createAt: "yyyy-MM-dd'T'HH:mm:ss",
			description: '오픽 설명',
			expireDate: "yyyy-MM-dd'T'HH:mm:ss",
			qualificationNumber: 'opop-icic',
		},
	],
};

export function LoadRawData() {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();

	const [loginState, setLoginState] = useState(false);

	const currentLogin = useSelector(selectLoginData);

	useEffect(() => {
		if (currentLogin.loginState) {
			// console.log('Header in main page - login state : ', currentLogin.loginState);
			setLoginState(true);
		} else {
			// console.log('Header in main page - login state : ', currentLogin.loginState);
			setLoginState(false);
		}
	}, [currentLogin.loginState]);

	// console.log('여기는 LoadRawData 함수 \n 이제 리퀘스트 보낸다?');

	let accessTokenFromServer = '';
	// 테스트 할 때, 서버에서 받아올 로그인 토큰

	// 테스트로그인 요청
	// Axios.post(TestLoginURL, {
	// 	email: 'user1@gmail.com',
	// 	password: 'pwpw',
	// })
	// 	.then(response => {
	// 		// console.log('로그인 토큰 요청 \n test1@test1.com \n', response);
	// 		accessTokenFromServer = response.data.accessToken;
	// 		// console.log('accessTokenFromServer = ', accessTokenFromServer);
	// 	})
	// 	.catch(error => {
	// 		// console.log('error = ', error);
	// 	});

	// // 블록체인 블럭 요청, 위에서 테스트 로그인 해서 받아온 로그인 토큰 이용
	// Axios.get(TestURL, {
	// 	accessToken: accessTokenFromServer,
	// })
	// 	.then(response => {
	// 		// console.log('블록체인 블럭 토큰 요청 \n', response);
	// 	})
	// 	.catch(error => {
	// 		// console.log('error = ', error);
	// 	});
}

export const RawdataSlice = createSlice({
	name: 'rawData',
	initialState: {
		origin: {
			title: '나의 데이터',
			items: loadBlockFromServer,
		},
	},
	reducers: {
		DragdataChange: (state, action) => {
			state.origin.items = action.payload;
			// state.items = action.payload;
		},
		// DeletedataChange: (state, action) => {
		// 	state.origin.items = action.payload;
		// 	// state.items = action.payload;
		// },
	},
});

export const { DragdataChange } = RawdataSlice.actions;
export const selectRawData = state => state.rawData;
export default RawdataSlice.reducer;
