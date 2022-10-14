import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SuccessLogin } from 'Redux/LoginCheck';

const GoogleLoginButton = () => {
	const clientID = '57988589193-h09ghivls1ie0affm6curnh446lhbjpl.apps.googleusercontent.com';
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onSuccess = response => {
		// const Swal = require('sweetalert2');

		// const profile = response.getBasicProfile();

		// const userdata = {
		// 	email: profile.getEmail(),
		// 	image: profile.getImageUrl(),
		// 	name: profile.getName(),
		// };

		console.log('response = ', response);
		// console.log('userdata = ', userdata);
		console.log('access token = ', response['accessToken']);

		// Swal.fire({
		// 	title: 'Login',
		// 	text: '로그인 성공',
		// 	icon: 'success',
		// 	confirmButtonText: 'OK',
		// 	heightAuto: false,
		// });

		// setIsLogin(true);
		// navigate('/main');
		// console.log('response = ', response);
		dispatch(SuccessLogin(true));
		navigate('/');
	};

	// const onSuccess = response => {
	// 	console.log('SUCCESS', response);
	// };

	const onFailure = response => {
		console.log('FAIL', response);
	};

	return (
		<div style={{ width: '150px' }}>
			<GoogleLogin
				clientId={clientID}
				buttonText="구글 로그인" // 버튼에 뜨는 텍스트
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};
export default GoogleLoginButton;
