import { useState, useEffect } from 'react';

import AOMD_logo from 'Image/AOMD_logo.svg';

import TeamInfo from 'Image/TeamInfo.png';

// import scenario1 from 'Image/scenario1.png';
// import scenario2 from 'Image/scenario2.png';
// import scenario3 from 'Image/scenario3.png';

import School from 'Image/School.svg';
import goverment from 'Image/goverment.png';

import Company from 'Image/Company.svg';

import IntroducePageDivContent4Img from 'Image/IntroducePageDivContent4Img.png';

import IntroducePageDivContent5Img1 from 'Image/IntroducePageDivContent5Img1.svg';
import IntroducePageDivContent5Img2 from 'Image/IntroducePageDivContent5Img2.svg';
import IntroducePageDivContent5Img3 from 'Image/IntroducePageDivContent5Img3.svg';

import upArrow from 'Image/upArrow.svg';

import { MoveTopBtn } from 'Page/FirstPage/FirstPage';

import './IntroducePage.css';

function IntroducePage() {
	const [ScrollValueOfY, setScrollValueOfY] = useState(0);
	// const [MoveToTopBtnStatus, setMoveToTopBtnStatus] = useState(false);
	const [MoveToTopBtnStatus, setMoveToTopBtnStatus] = useState(false);

	const moveToTopFunc = () => {
		setMoveToTopBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
		setScrollValueOfY(0); // ScrollY 의 값을 초기화

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const scrollCheckFunc = () => {
		// console.log('window.pageYOffset = ', window.pageYOffset);
		setScrollValueOfY(window.pageYOffset);
		if (ScrollValueOfY > 150) {
			setMoveToTopBtnStatus(true);
		} else {
			setMoveToTopBtnStatus(false);
		}
	};

	useEffect(() => {
		// console.log(123);
		const watch = () => {
			window.addEventListener('scroll', scrollCheckFunc);
		};
		watch();
		return () => {
			window.removeEventListener('scroll', scrollCheckFunc);
		};
	});

	return (
		<div className="IntroducePageDiv">
			<MoveTopBtn active={MoveToTopBtnStatus} onClick={moveToTopFunc}>
				<img src={upArrow} alt="upArrow"></img>
			</MoveTopBtn>

			<div className="IntroducePageDivContent1">
				{/* <h1> AOMD 소개 </h1> */}

				<div className="IntroducePageDivContent1_Box">
					<div className="IntroducePageDivContent1_Box1">
						<img src={AOMD_logo} alt="AOMD_logo" />
						<p> Archive of my data</p>
					</div>
					<div className="IntroducePageDivContent1_Box2">
						<p>
							저희 AOMD는 블록체인 시스템을 기반으로 한 개인 포트폴리오 관리
							플랫폼입니다.
						</p>
						<p>
							인증된 기관으로부터 발급된 신뢰성있는 데이터들로 포트폴리오를 구성하기에
							믿을 수 있습니다.
						</p>
						<p>
							학교나 기관, 대형 기업들 뿐만 아니라 일반 사용자를 대상으로
							서비스합니다.
						</p>
						<p>
							드래그 앤 드랍과 같은 기능과 감각적인 UI를 통해 편리하게 포트폴리오를
							생성 및 관리합니다.
						</p>
					</div>
				</div>
			</div>

			<div className="IntroducePageDivContent2">
				<div className="IntroducePageDivContent2_Box1">
					<p className="IntroducePageDivContent2_Box1_title">
						포트폴리오<span>란?</span>
					</p>
					<p className="IntroducePageDivContent2_Box1_content">
						자신의 이력이나 경력 또는 실력 등을 알아볼 수 있도록 자신이 과거에 만든
						작품이나 관련 내용 등을 모아놓은 자료철 또는 자료 묶음, 작품집으로, 실기와
						관련된 경력증명서이다.
					</p>
				</div>
				<div className="IntroducePageDivContent2_Box1">
					<p className="IntroducePageDivContent2_Box1_title">
						포트폴리오 관리 플랫폼<span>이란?</span>
					</p>
					<p className="IntroducePageDivContent2_Box1_content">
						내부 합의 알고리즘을 통해 인증된 기업으로부터 직접 발급된, 신뢰성이 보장된
						자기 정보 데이터를 이용하여 개인 포트폴리오를 생성하고 관리합니다. 이를
						토대로 생성된 세상에 단 하나 뿐인 URL을 기업에 제출할 수 있습니다.
					</p>
				</div>
			</div>
			{/* <p className="DivideBoxDot">...</p> */}

			<div className="IntroducePageDivContent3">
				{/* <h1> 팀원 소개 </h1> */}
				<img src={TeamInfo} alt="Team info" />
			</div>
			<p className="DivideBoxDot">...</p>

			<div className="IntroducePageDivContent4">
				<p className="IntroducePageDivContent4_Box1_title">포트폴리오 관리 서비스</p>
				<p className="IntroducePageDivContent4_Box1_content1">
					개인 사용자를 대상으로 만들어진 편리한 UI를 통해 손쉽게 포트폴리오를 관리하세요!
				</p>
				<img src={IntroducePageDivContent4Img} alt="IntroducePageDivContent4Img" />
				<p className="IntroducePageDivContent4_Box1_content2">
					개인정보 위,변조 문제를 해결하기 위해 자기 정보 통제 및 데이터 무결성 측면에서
					장점을 가지는 블록체인을 활용하고 블록체인 네트워크는 프라이빗 네트워크의
					구현체인 하이퍼레저 패브릭을 기반으로 동작합니다.
				</p>
				<p className="IntroducePageDivContent4_Box1_content3">
					개인정보 위,변조 문제를 해결하기 위해 자기 정보 통제 및 데이터 무결성 측면에서
					장점을 가지는 블록체인을 활용하고 블록체인 네트워크는 프라이빗 네트워크의
					구현체인 하이퍼레저 패브릭을 기반으로 동작합니다.
				</p>
			</div>
			<p className="DivideBoxDot">...</p>

			<div className="IntroducePageDivContent5">
				<h1>사용자</h1>
				<div className="IntroducePageDivContent5_Box1">
					<img
						className="IntroducePageDivContent5Img1"
						src={IntroducePageDivContent5Img1}
						alt="IntroducePageDivContent5Img1"
					/>

					<div className="IntroducePageDivContent5_Box1_content">
						<p>
							서비스는 학력, 자격, 위.변조를 원천 차단하는 블록체인 기반 데이터 관리
							시스템을 기반으로 동작합니다.
						</p>
						<p>
							직접 선택한 포트폴리오 데이터로 기업이 요구하는 최소한의 정보만 노출할
							수 있습니다.
						</p>
						<p>
							감각적인 UI/UX를 통해 나의 포트폴리오를 한눈에, 쉽게 관리할 수 있습니다.
						</p>
					</div>
				</div>
				<div className="IntroducePageDivContent5_Box1">
					<div className="IntroducePageDivContent5_Box1_content">
						<p> url 링크를 이용하여 간편하게 입사지원을 할 수 있습니다.</p>
						<p>
							정해진 시간 이후 자동 소멸되는 URL 링크로 기업의 개인 정보 남용을 방지할
							수 있습니다.
						</p>
					</div>
					<img
						className="IntroducePageDivContent5Img2"
						src={IntroducePageDivContent5Img2}
						alt="IntroducePageDivContent5Img2"
					/>
				</div>
				<h1 className="IntroducePageDivContent5_Box1_h1">기업</h1>
				<div className="IntroducePageDivContent5_Box1">
					<img
						className="IntroducePageDivContent5Img3"
						src={IntroducePageDivContent5Img3}
						alt="IntroducePageDivContent5Img3"
					/>

					<div className="IntroducePageDivContent5_Box1_content">
						<p>
							입사 지원자 개인 경력에 대한 추가적인 검증을 시행하지 않아도 되므로
							시간이 단축됩니다.
						</p>
						<p>
							포트폴리오에 있는 데이터는 인증된 기업으로부터 발급된 데이터이므로 믿을
							수 있습니다.
						</p>
					</div>
				</div>
			</div>

			<p className="DivideBoxDot">...</p>

			<div className="IntroducePageDivContent6">
				{/* <h1> 참여 기관 및 기업 </h1> */}
				<div className="IntroducePageDivContent4">
					<p className="IntroducePageDivContent4_Box1_title">참여 기관 및 기업</p>
				</div>
				<div className="IntroducePageDivContent3_SchoolAndCompany">
					<div className="SchoolAndCompany_p1">
						<img className="goverment" src={goverment} alt="goverment" />

						<h1>정부</h1>
						<div className="SchoolAndCompany_div">
							<p>과학기술정보통신부</p>
							<p>과학기술정보통신부</p>
							<p>과학기술정보통신부</p>
						</div>
					</div>
					<div className="SchoolAndCompany_p2">
						<img className="School" src={School} alt="School" />

						<h1>학교</h1>
						<div className="SchoolAndCompany_div">
							<p>부산대학교</p>
							<p>부산대학교</p>
							<p>부산대학교</p>
						</div>
					</div>
					<div className="SchoolAndCompany_p3">
						<img className="Company" src={Company} alt="Company" />

						<h1>기업</h1>
						<div className="SchoolAndCompany_div">
							<p>삼성전자</p>
							<p>삼성전자</p>
							<p>삼성전자</p>
						</div>
					</div>
				</div>
			</div>

			{/* <p className="DivideBoxDot">...</p>

			<div className="IntroducePageDivContent7">
				<img className="IntroducePage_scenario1" src={scenario1} alt="scenario1" />
				<img className="IntroducePage_scenario2" src={scenario2} alt="scenario2" />
				<img className="IntroducePage_scenario3" src={scenario3} alt="scenario3" />
			</div> */}
		</div>
	);
}

export default IntroducePage;
