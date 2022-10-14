import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderInMainPage from './HeaderInMainPage';
import HeaderInAnotherPage from './HeaderInAnotherPage';

export const OnToggleList = styled.div`
	display: ${({ active }) => {
		if (active) {
			return 'flex';
		}
		return 'none';
	}};
`;

function Header(props) {
	const logoCheck = props.logoCheck;
	// 로고 화이트 블랙 체크
	// console.log('logoCheck = ', logoCheck);

	const [infoLocation, setInfoLocation] = useState('');
	const location = useLocation();

	useEffect(() => {
		setInfoLocation(location.pathname);
	}, [location]);

	return (
		<>
			{infoLocation === '/' ? (
				<HeaderInMainPage logoCheck={logoCheck} />
			) : (
				<HeaderInAnotherPage logoCheck={logoCheck} />
			)}
		</>
	);
}

export default Header;
