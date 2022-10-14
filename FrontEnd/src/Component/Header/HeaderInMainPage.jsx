import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoginData, SuccessLogout } from 'Redux/LoginCheck';
import AOMD_logo from 'Image/AOMD_logo.svg';
import AOMD_logo_white from 'Image/AOMD_logo_white.svg';

import HBGIcon from 'Image/HBGIcon.svg';
import HBGIcon_white from 'Image/HBGIcon_white.svg';

import loginIcon from 'Image/loginIcon.svg';
import loginIcon_white from 'Image/loginIcon_white.svg';

import Category from './Category';
import { OnToggleList } from './Header';

import './Header.css';

const HeaderInMainPage = props => {
	const logoCheck = props.logoCheck;
	// 로고 화이트 블랙 체크
	// console.log('logoCheck = ', logoCheck);

	const [menuToggle, setMenuToggle] = useState(false);
	const [loginState, setLoginState] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentLogin = useSelector(selectLoginData);

	useEffect(() => {
		if (currentLogin.loginState) {
			console.log('Header in main page - login state : ', currentLogin.loginState);
			setLoginState(true);
		} else {
			console.log('Header in main page - login state : ', currentLogin.loginState);
			setLoginState(false);
		}
	}, [currentLogin.loginState]);

	const onClickToggleMenu = () => {
		setMenuToggle(!menuToggle);
	};
	const onClickMoveHome = () => {
		setMenuToggle(false);
		navigate('/');
	};
	const onClickMoveLogin = () => {
		setMenuToggle(false);
		navigate('/loginpage');
	};
	const onClickLogout = () => {
		setMenuToggle(false);
		dispatch(SuccessLogout(true));
		navigate('/');
	};

	const onClickMoveEnterprise = () => {
		setMenuToggle(false);
		navigate('/enterprisepage');
	};

	return (
		<div className="HeaderContainer">
			<div className="LeftBox" onClick={onClickMoveEnterprise}>
				<p>영업팀에 문의하기</p>
			</div>

			<div
				style={{
					display: 'flex',
					width: '40%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div className="MoveHomeBtn" onClick={onClickMoveHome}>
					<>
						{logoCheck === true ? (
							<img src={AOMD_logo_white} alt="logoImg" style={{ width: '50%' }} />
						) : (
							<img src={AOMD_logo} alt="logoImg" style={{ width: '50%' }} />
						)}
					</>
				</div>
			</div>

			<div className="RightBox">
				<div
					style={{
						width: '110px',
						background: 'white',
						cursor: 'pointer',
						display: 'flex',
						borderRadius: '10px',
						// background: 'transparent',
					}}
				>
					{!loginState ? (
						<button
							onClick={onClickMoveLogin}
							style={{
								display: 'flex',
								// background: 'white',
								border: 'none',
								cursor: 'pointer',
								alignItems: 'center',
								paddingLeft: '50px',
							}}
						>
							<>
								{logoCheck === true ? (
									<img
										src={loginIcon_white}
										alt="loginIcon_white"
										style={{
											display: 'flex',
											width: '25px',
											height: '25px',
										}}
									/>
								) : (
									<img
										src={loginIcon}
										alt="loginIcon"
										style={{
											display: 'flex',
											width: '25px',
											height: '25px',
										}}
									/>
								)}
							</>

							<p
								style={{
									display: 'flex',
									width: '50px',
									fontSize: '13px',
									marginLeft: '3px',
									// color: 'red',
								}}
							>
								로그인
							</p>
						</button>
					) : (
						<button
							onClick={onClickLogout}
							style={{
								display: 'flex',
								// background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								alignItems: 'center',
								paddingLeft: '50px',
							}}
						>
							<>
								{logoCheck === true ? (
									<img
										src={loginIcon_white}
										alt="loginIcon_white"
										style={{
											display: 'flex',
											width: '25px',
											height: '25px',
										}}
									/>
								) : (
									<img
										src={loginIcon}
										alt="loginIcon"
										style={{
											display: 'flex',
											width: '25px',
											height: '25px',
										}}
									/>
								)}
							</>
							<p
								style={{
									display: 'flex',
									width: '70px',
									fontSize: '13px',
									marginLeft: '3px',
								}}
							>
								로그아웃
							</p>
						</button>
					)}
				</div>

				<div className="ToggleMenuBox">
					<button className="HBGToggleBtn" onClick={onClickToggleMenu}>
						<>
							{logoCheck === true ? (
								<img src={HBGIcon_white} alt="HbgToggle_white"></img>
							) : (
								<img src={HBGIcon} alt="HbgToggle"></img>
							)}
						</>
					</button>

					<OnToggleList
						className="OnToggleList"
						active={menuToggle}
						onMouseLeave={() => setMenuToggle(false)}
					>
						<Category loginState={loginState} />
					</OnToggleList>
				</div>
			</div>
		</div>
	);
};
export default HeaderInMainPage;
