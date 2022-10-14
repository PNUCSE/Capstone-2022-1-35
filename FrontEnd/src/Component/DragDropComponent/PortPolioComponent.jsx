import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import TaskCard from './TaskCard';
import { ProvidedPlaceholder } from './RawDataComponent';

import { TestURL } from 'domainBox';
// import { KakaoRedirectURL } from 'domainBox';
// import { ServerURL } from 'domainBox';

export const requestStorePortData = {
	title: 'newTitle',
	sharing: true,
	portfolioBlockList: [
		{
			blockId: 'opop-icic1',
		},
		{
			blockId: 'opop-icic2',
		},
		{
			blockId: 'opop-icic3',
		},
	],
	resumeList: [
		{
			question: 'newQuestion1',
			content: 'newContent1',
		},
		{
			question: 'newQuestion2',
			content: 'newContent2',
		},
		{
			question: 'newQuestion3',
			content: 'newContent3',
		},
	],
};

const Storing = styled.div`
	display: ${({ active }) => {
		if (active) {
			return 'flex';
		}
		return 'none';
	}};

	width: 120px;
	height: 20px;
	padding-top: 10px;

	& span {
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color: gray;
		border-radius: 50%;
		animation: loading 1s 0s linear infinite;
	}

	& span:nth-child(1) {
		animation-delay: 0s;
		background-color: red;
	}

	& span:nth-child(2) {
		animation-delay: 0.2s;
		background-color: orange;
	}

	& span:nth-child(3) {
		animation-delay: 0.4s;
		background-color: yellowgreen;
	}

	@keyframes loading {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}
`;

function PortPolioComponent(props) {
	const { showState, portData } = props;
	const Swal = require('sweetalert2');
	const navigate = useNavigate();

	const onClickStore = () => {
		setStoringState(true);

		Axios.post(TestURL, {
			loadBlockFromServer: requestStorePortData,
		})
			.then(response => {
				console.log('loadBlockFromServer = ', response);
				// dispatch(SuccessLogin(true));
				navigate('/');
				// console.log('성공적으로 로그인되었습니다');
			})
			.catch(error => {
				console.log('error = ', error);
			});

		setTimeout(function () {
			setStoringState(false);
		}, 2000);
	};

	const onClickMakeURL = () => {
		Swal.fire({
			title: '생성된 URL',
			showDenyButton: true,
			text: 'www.naver.com',
			icon: 'success',
			confirmButtonText: 'OK',
			denyButtonText: `Copy`,
			heightAuto: false,
		}).then(result => {
			if (result.isDenied) {
				console.log(result);
			}
		});
		navigate('/portpolio');
	};

	// const onClickLoad = () => {
	// 	setQuestionData([
	// 		portData.port1.introductions[0].question,
	// 		portData.port1.introductions[0].content,
	// 		portData.port1.introductions[0].content.length,
	// 	]);
	// };

	// console.log('portData.port1.title = ', portData.port1.title);
	// console.log('portData.port1.items = ', portData.port1.items);
	// console.log('portData.port1.introductions = ', portData.port1.introductions);

	function returnTaskCard() {
		const info = portData;

		return (
			<Fragment>
				<div className="DataBox2">
					<p className="DataBoxh2"> 수상내역 </p>
					<div className="DataBoxContent">
						{info.port1.items.awardDtoList.map(items => {
							return (
								<TaskCard key={items.id} item={items} index={items} datatype="" />
							);
						})}
					</div>
				</div>
				<div className="DataBox2">
					<p className="DataBoxh2"> 학력 </p>
					<div className="DataBoxContent">
						{info.port1.items.educationDtoList.map(items => {
							return (
								<TaskCard key={items.id} item={items} index={items} datatype="" />
							);
						})}
					</div>
				</div>
				<div className=" DataBox2">
					<p className="DataBoxh2"> 자격증 </p>
					<div className="DataBoxContent">
						{info.port1.items.licenseDtoList.map(items => {
							return (
								<TaskCard key={items.id} item={items} index={items} datatype="" />
							);
						})}
					</div>
				</div>
			</Fragment>
		);
	}

	const [storingState, setStoringState] = useState(false);

	const [questionData, setQuestionData] = useState(
		portData.port1.items.resumeDtoList[0].question
	);
	const [questionContent, setQuestionContent] = useState(
		portData.port1.items.resumeDtoList[0].content
	);

	const [questionCount, setQuestionCount] = useState(1);

	const questionChangeFunc = e => {
		setQuestionData(e.target.value);
	};

	const contentChangeFunc = e => {
		setQuestionContent(e.target.value);
		var lengthVar = document.getElementById(`lengthOfContent_P${e.target.id}`);
		lengthVar.innerText = e.target.value.length + ' 자';
	};

	const onClickAddContent = e => {
		setQuestionCount(questionCount + 1);

		var parentBox = document.getElementById('ContentBoxCanAdd');

		var newDiv = document.createElement('div');
		newDiv.setAttribute('class', `IntroduceContentBox`);

		newDiv.innerHTML += '<p>' + '문항 ' + '</p>';

		var newInput = document.createElement('input');
		newInput.setAttribute('id', questionCount);
		newInput.setAttribute('type', 'text');
		newInput.setAttribute('placeholder', '자기소개서 질문');

		newDiv.appendChild(newInput);

		var newTextarea = document.createElement('textarea');
		newTextarea.setAttribute('class', `IntroduceText`);
		newTextarea.setAttribute('id', questionCount);
		newTextarea.setAttribute('type', 'text');
		newTextarea.setAttribute('placeholder', '...');

		var newP = document.createElement('p');
		newP.setAttribute('class', 'lengthOfContent_P');
		newP.setAttribute('id', `lengthOfContent_P${questionCount}`);

		newP.innerHTML += '0 자';

		parentBox.appendChild(newDiv);
		parentBox.appendChild(newTextarea);
		parentBox.appendChild(newP);
	};

	const onClickTitleChange = e => {
		alert('포트폴리오 제목 수정하기 \n 아직 개발중인 기능입니다. ');
	};

	return (
		<Fragment>
			{showState[0] ? (
				<Fragment>
					<Droppable key={portData.port1.title} droppableId={portData.port1.title}>
						{(provided, snapshot) => (
							<div
								className="Portpolio"
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<h1 className="ColumnTitle2">
										{portData.port1.title}
										<button onClick={onClickTitleChange}>수정</button>
									</h1>

									{returnTaskCard()}
								</div>
								<div>
									<div className="TitleBox">
										<h1>자기소개서</h1>
									</div>

									<div id="ContentBoxCanAdd">
										<div className="IntroduceContentBox">
											<p>
												문항{' '}
												{portData.port1.items.resumeDtoList[0].resumeId}
											</p>
											<input
												id="0"
												value={questionData}
												type="text"
												onChange={questionChangeFunc}
												placeholder="자기소개서 질문"
											></input>
										</div>

										<textarea
											id="0"
											className="IntroduceText"
											value={questionContent}
											type="text"
											onChange={contentChangeFunc}
											placeholder="..."
										></textarea>
										<p id="lengthOfContent_P0" className="lengthOfContent_P">
											0 자
										</p>
									</div>
									<button className="AddQuestionBtn" onClick={onClickAddContent}>
										<span>문항 추가하기</span>
									</button>
								</div>

								<div className="SubmitBox">
									{/* <button className="SubmitBoxBtn" onClick={onClickLoad}>
										<span>불러오기</span>
									</button> */}
									<button className="SubmitBoxBtn" onClick={onClickStore}>
										<span className="SubmitBoxBtnFront">저장하기</span>
									</button>
									<button className="SubmitBoxBtn" onClick={onClickMakeURL}>
										<span className="SubmitBoxBtnFront">URL 복사하기</span>
									</button>
									<Storing active={storingState}>
										<span></span>
										<span></span>
										<span></span>
										<p style={{ marginLeft: '10px' }}>저장 중</p>
									</Storing>
								</div>

								<ProvidedPlaceholder>{provided.placeholder}</ProvidedPlaceholder>
							</div>
						)}
					</Droppable>
				</Fragment>
			) : null}
		</Fragment>
	);
}

export default PortPolioComponent;
