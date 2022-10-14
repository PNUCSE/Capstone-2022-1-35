import Sinario_Image0 from 'Image/Sinario/Image0.png';
import Sinario_Image1 from 'Image/Sinario/Image1.png';
import Sinario_Image2 from 'Image/Sinario/Image2.png';
import Sinario_Image3 from 'Image/Sinario/Image3.png';
import Sinario_Image4 from 'Image/Sinario/Image4.png';

import Server_Image0 from 'Image/ServerSide/Image0.png';
// AOMD 서비스 아키텍쳐
import Server_Image1 from 'Image/ServerSide/Image1.png';
// 도커 버전 정보
import Server_Image2 from 'Image/ServerSide/Image2.png';
// CI/CD 파이프 라인
import Server_Image3 from 'Image/ServerSide/Image3.png';
// 리버스 프록시 흐름도
import Server_Image4 from 'Image/ServerSide/Image4.png';
// 웹 어플리케이션 서버 배포 현황
import Server_Image5 from 'Image/ServerSide/Image5.png';
// 인프라 요청 흐름도
import Server_Image6 from 'Image/ServerSide/Image6.png';
// MySQL 배포 현황

import BlockChain_Image0 from 'Image/BlockChain/Image0.png';
// 블록체인 네트워크 구조
import BlockChain_Image1 from 'Image/BlockChain/Image1.png';
// 블록체인 네트워크 구성을 위한 도커 컨테이너가 모두 구성된 모습
import BlockChain_Image2 from 'Image/BlockChain/Image2.png';
// 블록체인 네트워크에 정의된 Asset과 Chaincode

import Front_Image0 from 'Image/Front/Image0.png';
// 리덕스 통신 구조
import Front_Image1 from 'Image/Front/Image1.png';
// 페이지 라우팅 구조

// import down_arrow_icon1 from 'Image/down-arrow_icon1.svg';
import arrow_icon from 'Image/right-arrow-icon.png';

import './IntroduceDetailPage.css';

function IntroduceDetailPage() {
	return (
		<div>
			<div className="IntroduceDetailPage_BigBox">
				<div className="IntroduceDetailPage_BigBox_ContentA">
					<p>사용자 설문조사 결과 분석</p>
				</div>

				<div className="IntroduceDetailPage_ContentBox">
					<div className="IntroduceDetailPage_ContentA">
						<p>설문 1</p>
						<img className="image0" src={Sinario_Image0} alt="Image0" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>설문 2</p>
						<img className="image1" src={Sinario_Image1} alt="Image1" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>설문 3</p>
						<img className="image2" src={Sinario_Image2} alt="Image2" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>설문 4</p>
						<img className="image2" src={Sinario_Image3} alt="Image3" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>설문 5</p>
						<img className="image3" src={Sinario_Image4} alt="Image4" />
					</div>
				</div>
			</div>
			<div className="IntroduceDetailPage_BigBox">
				<div className="IntroduceDetailPage_BigBox_ContentA">
					<p>전체 시나리오 및 시스템 구성도</p>
				</div>

				<div className="IntroduceDetailPage_ContentBox">
					<div className="IntroduceDetailPage_ContentA">
						<p>시스템 구성도</p>
						<img className="image0" src={Sinario_Image0} alt="Image0" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>프로세스 다이어그램</p>
						<img className="image1" src={Sinario_Image1} alt="Image1" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>회원가입 및 로그인 플로우 차트</p>
						<img className="image2" src={Sinario_Image2} alt="Image2" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>포트폴리오 관리 플로우 차트</p>
						<img className="image2" src={Sinario_Image4} alt="Image3" />
					</div>
				</div>
			</div>
			<div className="IntroduceDetailPage_BigBox">
				<div className="IntroduceDetailPage_BigBox_ContentA">
					<p>Block Chain</p>
				</div>
				<div className="IntroduceDetailPage_BlockChain">
					<div className="IntroduceDetailPage_BlockChain_box">
						<img
							className="BlockChain_Image0"
							src={BlockChain_Image0}
							alt="BlockChain_Image0"
						/>
						<h1>블록체인 네트워크 구조</h1>
					</div>
					<div className="IntroduceDetailPage_BlockChain_box">
						<img
							className="BlockChain_Image1"
							src={BlockChain_Image1}
							alt="BlockChain_Image1"
						/>
						<h1>블록체인 네트워크 도커 컨테이너 구성</h1>
					</div>
				</div>
				<div className="IntroduceDetailPage_BlockChain_box">
					<img
						className="BlockChain_Image2"
						src={BlockChain_Image2}
						alt="BlockChain_Image2"
					/>
					<h1>블록체인 네트워크에 정의된 Asset과 Chaincode</h1>
				</div>
			</div>
			<div className="IntroduceDetailPage_BigBox">
				<div className="IntroduceDetailPage_BigBox_ContentA">
					<p> Server Side </p>
				</div>

				<div className="IntroduceDetailPage_ContentBox">
					<div className="IntroduceDetailPage_ContentA">
						<p>AOMD 서비스 아키텍쳐</p>
						<img src={Server_Image0} alt="Image0" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>도커 버전 정보</p>
						<img id="docker_version_img" src={Server_Image1} alt="Image1" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>CI/CD 파이프 라인</p>
						<img src={Server_Image2} alt="Image2" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>리버스 프록시 흐름도</p>
						<img src={Server_Image3} alt="Image3" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>웹 어플리케이션 서버 배포 현황</p>
						<img src={Server_Image4} alt="Image4" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>인프라 요청 흐름도</p>
						<img src={Server_Image5} alt="Image4" />
					</div>
					<div className="right_iconBox">
						<img className="right__arrow_icon" alt="arrow_icon" src={arrow_icon}></img>
					</div>
					<div className="IntroduceDetailPage_ContentA">
						<p>MySQL 배포 현황</p>
						<img src={Server_Image6} alt="Image4" />
					</div>
				</div>
			</div>
			<div className="IntroduceDetailPage_BigBox">
				<div className="IntroduceDetailPage_BigBox_ContentA">
					<p>Front Side</p>
				</div>
				<div className="IntroduceDetailPage_Front">
					<div className="IntroduceDetailPage_Front_box">
						<img className="Front_Image0" src={Front_Image0} alt="Front_Image0" />
						<h1>리덕스 통신 구조</h1>
					</div>
					<div className="IntroduceDetailPage_Front_box">
						<img className="Front_Image1" src={Front_Image1} alt="Front_Image1" />
						<h1>페이지 라우팅 구조</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IntroduceDetailPage;
