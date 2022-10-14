import React from 'react';
import AOMD_logo from 'Image/AOMD_logo.svg';
import './Footer.css';

function Footer() {
	return (
		<div className="FooterDiv">
			<div className="FooterHomeLogo">
				<img src={AOMD_logo} alt="logoImg" />
			</div>

			<div className="FooterCategory">
				<div>
					<h1>제품</h1>
					<ul>
						<li>개요 </li>
						<li>요금제 </li>
						<li>고객 스토리 </li>
						<li>요금제 </li>
						<li>보안 </li>
						<li>이용약관 및 </li>
						<li>개인정보 보호정책 </li>
					</ul>
				</div>
				<div>
					<h1>AOMD 이용 대상</h1>
					<ul>
						<li>기업</li>
						<li>소기업</li>
						<li>개인 </li>
						<li>스타트업 </li>
						<li>교육 </li>
						<li>디자인 </li>
						<li>매니저 </li>
					</ul>
				</div>
				<div>
					<h1>자료</h1>
					<ul>
						<li>가이드와 튜토리얼</li>
						<li>도움말 센터</li>
						<li>요금제 </li>
						<li>커뮤니티 </li>
						<li>새로운 소식 </li>
						<li>요금제 </li>
					</ul>
				</div>
				<div>
					<h1>회사 소개</h1>
					<ul>
						<li>AOMD 소개</li>
						<li>채용</li>
						<li>영업팀에 문의하기 </li>
						<li>Notion에 이메일 보내기 </li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Footer;
