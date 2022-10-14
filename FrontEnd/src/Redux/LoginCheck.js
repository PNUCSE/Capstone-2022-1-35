import { createSlice } from '@reduxjs/toolkit';

export const LoginCheck = createSlice({
	name: 'loginData',
	initialState: {
		loginState: false,
	},
	reducers: {
		SuccessLogin: state => {
			console.log('여기는 리덕스, 로그인 성공으로 바꾼다');
			state.loginState = true;
		},
		SuccessLogout: state => {
			console.log('여기는 리덕스, 로그아웃, 로그인 실패로 바꾼다');
			state.loginState = false;
		},
	},
});

export const { SuccessLogin, SuccessLogout } = LoginCheck.actions;

export const selectLoginData = state => state.loginData;

export default LoginCheck.reducer;
