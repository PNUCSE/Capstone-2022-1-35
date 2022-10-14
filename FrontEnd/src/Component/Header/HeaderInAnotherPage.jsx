import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoginData, SuccessLogout } from 'Redux/LoginCheck';
import AOMD_logo from 'Image/AOMD_logo.svg';
import AOMD_logo_white from 'Image/AOMD_logo_white.svg';

import HBGIcon from 'Image/HBGIcon.svg';
import HBGIcon_white from 'Image/HBGIcon_white.svg';

import loginIcon from 'Image/loginIcon.svg';
import loginIcon_white from 'Image/loginIcon_white.svg';

import './Header.css';

import { OnToggleList } from './Header';
import Category from './Category';

const HeaderInAnotherPage = props => {
	const logoCheck = props.logoCheck;
	// console.log('logoCheck = ', logoCheck);

	const [infoLocation, setInfoLocation] = useState('');
	const [loginState, setLoginState] = useState(false);
	const [menuToggle, setMenuToggle] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setInfoLocation(location.pathname);
	}, [location]);

	const currentLogin = useSelector(selectLoginData);

	useEffect(() => {
		if (currentLogin.loginState) {
			setLoginState(true);
		} else {
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

	return (
		<>
			{infoLocation === '/portpolio' ? (
				<></>
			) : (
				<div className="HeaderContainer">
					<div
						className="LeftBox"
						style={{
							width: '40%',
						}}
					>
						<div className="MoveHomeBtn" onClick={onClickMoveHome}>
							<>
								{logoCheck === true ? (
									<img
										src={AOMD_logo_white}
										alt="logoImg"
										style={{ width: '80%' }}
									/>
								) : (
									<img src={AOMD_logo} alt="logoImg" style={{ width: '80%' }} />
								)}
							</>
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							width: '30%',
						}}
					/>

					<div className="RightBox">
						<div
							style={{
								width: '110px',
								cursor: 'pointer',
								display: 'flex',
								borderRadius: '10px',
								background: 'transparent',
							}}
						>
							{!loginState ? (
								<>
									<button
										onClick={onClickMoveLogin}
										style={{
											display: 'flex',
											background: 'transparent',
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
											}}
										>
											로그인
										</p>
									</button>
								</>
							) : (
								<>
									<button
										onClick={onClickLogout}
										style={{
											display: 'flex',
											background: 'transparent',
											border: 'none',
											cursor: 'pointer',
											alignItems: 'center',
											paddingLeft: '50px',
										}}
									>
										<img
											src={loginIcon}
											alt="loginIcon"
											style={{
												display: 'flex',
												width: '25px',
												height: '25px',
											}}
										/>
										<p
											style={{
												display: 'flex',
												width: '50px',
												fontSize: '13px',
												marginLeft: '4px',
											}}
										>
											로그아웃
										</p>
									</button>
								</>
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
			)}
		</>
	);
};
export default HeaderInAnotherPage;
