import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SuccessLogin } from 'Redux/LoginCheck';
import GoogleLoginButton from 'Component/SocialLogin/GoogleLoginButton';
import KakaoLoginButton from 'Component/SocialLogin/KakaoLoginButton';

import './LoginRegisterPage.css';

export function LoginPage() {
	const [logintext, setlogintext] = useState({ id: '', pwd: '' });
	// const Swal = require('sweetalert2');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onClickLogin = e => {
		if (logintext.id === '1' && logintext.pwd === '1') {
			dispatch(SuccessLogin(true));
			navigate('/');
		}
		if (logintext.id === 'test1@test.com' && logintext.pwd === 'pwpw') {
			dispatch(SuccessLogin(true));
			console.log('테스트용 로그인');
			navigate('/');
		}
	};

	const onClickSign = () => {
		navigate('/registerpage');
	};

	return (
		<div className="LoginPageDiv">
			<div className="LoginPageForm">
				<form>
					<input
						className="LoginFormInput"
						type="text"
						placeholder="ID"
						onChange={e => setlogintext({ ...logintext, id: e.target.value })}
					/>
					<input
						className="LoginFormInput"
						type="password"
						placeholder="PASSWORD"
						autoComplete="off"
						onChange={e => setlogintext({ ...logintext, pwd: e.target.value })}
					/>
					<button className="FormButton" onClick={onClickLogin}>
						로그인
					</button>
					<div style={{ color: '#757575', fontSize: '12px', background: 'transparent' }}>
						<p style={{ padding: '15px' }}>아이디가 없으신가요 ?</p>
						<button className="FormButton" onClick={onClickSign}>
							회원가입
						</button>
					</div>
				</form>
				<div style={{ background: 'transparent' }}>
					<div style={{ color: '#757575', fontSize: '12px', background: 'transparent' }}>
						<p style={{ padding: '15px' }}> 소셜 로그인을 통한 간편 회원가입 </p>
					</div>
					<div style={{ display: 'flex', background: 'transparent' }}>
						<KakaoLoginButton />
						<GoogleLoginButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
