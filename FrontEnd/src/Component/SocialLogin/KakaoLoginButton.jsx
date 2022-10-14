import React from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

import kakaoBtn from 'Image/kakaoBtn.png';

const KakaoLoginButton = () => {
	Axios.defaults.withCredentials = true;

	const { Kakao } = window;
	let location = useLocation();

	const kakaoLoginClickHandler = () => {
		console.log('location in KakaoLoginButton = ', location);
		function loginWithKakao() {
			Kakao.Auth.authorize({
				// redirectUri: './oauth',
				// redirectUri: 'http://localhost:3000/AOMD-Client/oauth',
				redirectUri: 'http://15.164.231.60:3000/oauth',
				// redirectUri: 'https://jo2seo.github.io/oauth',
			});
		}
		loginWithKakao();

		// 아래는 데모를 위한 UI 코드입니다.
		// function displayToken() {
		// 	const token = getCookie('authorize-access-token');
		// 	if (token) {
		// 		Kakao.Auth.setAccessToken(token);
		// 		Kakao.Auth.getStatusInfo(({ status }) => {
		// 			if (status === 'connected') {
		// 				document.getElementById('token-result').innerText =
		// 					'login success. token: ' + Kakao.Auth.getAccessToken();
		// 			} else {
		// 				Kakao.Auth.setAccessToken(null);
		// 			}
		// 		});
		// 	}
		// }
		// function getCookie(name) {
		// 	const value = '; ' + document.cookie;
		// 	const parts = value.split('; ' + name + '=');
		// 	if (parts.length === 2) return parts.pop().split(';').shift();
		// }
		// displayToken();
		// console.log(getAccessToken());

		// const Swal = require('sweetalert2');
		// try {
		// 	return new Promise((resolve, reject) => {
		// 		if (!Kakao) {
		// 			Swal.fire({
		// 				title: 'Fail',
		// 				text: '카카오 인스턴스가 없습니다',
		// 				icon: 'fail',
		// 				confirmButtonText: 'OK',
		// 				heightAuto: false,
		// 			});
		// 			reject('카카오 인스턴스가 없다');
		// 		}

		// 		Kakao.Auth.login({
		// 			success: auth => {
		// 				console.log('정상 로그인', auth);

		// 				const accessToken = auth['access_token'];
		// 				console.log('accessToken = ', accessToken);

		// 				Axios.get('http://aomd.kro.kr:8080/api/v1/auth/kakao', {
		// 					// http://aomd.kro.kr:8080/api/v1/auth/kakao?code=
		// 					params: {
		// 						code: accessToken,
		// 					},
		// 				})
		// 					.then(response => {
		// 						console.log('response = ', response);
		// 					})
		// 					.catch(error => {
		// 						console.log('error = ', error);
		// 					});

		// 				dispatch(SuccessLogin(true));

		// 				navigate('/AOMD-Client');
		// 			},
		// 			fail: err => {
		// 				console.error(err);
		// 			},
		// 		});
		// 	});
		// } catch (err) {
		// 	console.error(err);
		// }
	};
	return (
		<button
			style={{
				margin: '5px',
				padding: '0',
				border: 'none',
				cursor: 'pointer',
				backgroundColor: 'white',
			}}
		>
			<img
				src={kakaoBtn}
				alt="kakao login"
				onClick={kakaoLoginClickHandler}
				style={{ width: '130px', height: '40px' }}
			/>
		</button>
	);
};
export default KakaoLoginButton;
