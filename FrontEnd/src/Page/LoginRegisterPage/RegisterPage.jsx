import { useNavigate } from 'react-router-dom';
import './LoginRegisterPage.css';

function RegisterPage() {
	const navigate = useNavigate();

	const onClickSign = () => {
		navigate('/loginpage');
	};

	return (
		<div className="LoginPageDiv">
			<div className="LoginPageForm">
				<form>
					<input className="LoginFormInput" type="text" placeholder="name" />
					<input
						className="LoginFormInput"
						type="password"
						placeholder="password"
						autoComplete="off"
					/>
					<input className="LoginFormInput" type="text" placeholder="email address" />
					<button className="FormButton" style={{ marginBottom: '22px' }}>
						아이디 생성
					</button>
					<div style={{ color: '#757575', fontSize: '12px' }}>
						<p style={{ padding: '15px' }}>이미 회원이신가요 ? </p>
						<button className="FormButton" onClick={onClickSign}>
							로그인하러 가기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
