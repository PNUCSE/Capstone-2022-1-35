import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import { selectRawData } from './RawdataSlice';
import { DragdataChangePort, selectPortData } from './PortdataSlice';
import PortPolioComponent from 'Component/DragDropComponent/PortPolioComponent';
import RawDataComponent from 'Component/DragDropComponent/RawDataComponent';

import './ChangeData.css';

const PortBtn = styled.div`
	background: ${({ active }) => {
		if (active) {
			return '#203864';
		}
		return '#9fa9bc';
	}};
`;

function ChangeData() {
	const [portState, setPortState] = useState([true, false, false]);

	const dispatch = useDispatch();
	const originData = useSelector(selectRawData);
	// console.log('originData = ', originData);
	const portData = useSelector(selectPortData);
	console.log('portData = ', portData);

	// console.log('portData = ', portData);

	const onDragEnd = result => {
		if (!result.destination) return;
		// 드래그 드랍 가능한 범위 밖이면 걍 리턴

		const { source, destination } = result;
		console.log('result = ', result);

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = originData.origin;
			const destColumn = portData.port1;

			// console.log('sourceColumn = ', sourceColumn);
			// console.log('destColumn = ', destColumn);

			const sourceItems1 = [sourceColumn.items];
			const destItems1 = [destColumn.items];

			const sourceItems = sourceItems1[0];
			const destItems = destItems1[0];

			// console.log('sourceItems = ', sourceItems);
			// console.log('destItems = ', destItems);

			const dragItemID = result.draggableId;
			// console.log('dragItemID = ', dragItemID);

			var dragType = dragItemID.split('-');
			dragType = dragType[0];
			// console.log('@@@ =>', dragType);
			// 타입이 뭐냐 => AWARD, LICENSE ~~

			var awardValue = destItems.awardDtoList;
			// console.log('awardValue = ', awardValue);
			var awardValueLen = destItems.awardDtoList.length;
			var educationValue = destItems.educationDtoList;
			var educationValueLen = destItems.educationDtoList.length;
			var licenseValue = destItems.licenseDtoList;
			var licenseValueLen = destItems.licenseDtoList.length;

			var awardValueSource = sourceItems.awardDtoList;
			var awardValueSourceLen = sourceItems.awardDtoList.length;
			var educationValueSource = sourceItems.educationDtoList;
			var educationValueSourceLen = sourceItems.educationDtoList.length;
			var licenseValueSource = sourceItems.licenseDtoList;
			var licenseValueSourceLen = sourceItems.licenseDtoList.length;

			// 드래그 한 레코드
			var recordToAdd = {};

			// 레코드 뽑아오기
			if (dragType === 'AWARD') {
				for (var i = 0; i < awardValueSourceLen; i++) {
					if (result.draggableId === awardValueSource[i].id) {
						recordToAdd = awardValueSource[i];
						break;
					}
				}
			}
			if (dragType === 'EDUCATION') {
				for (var i = 0; i < educationValueSourceLen; i++) {
					if (result.draggableId === educationValueSource[i].id) {
						recordToAdd = educationValueSource[i];
						break;
					}
				}
			}
			if (dragType === 'LICENSE') {
				for (var i = 0; i < licenseValueSourceLen; i++) {
					if (result.draggableId === licenseValueSource[i].id) {
						recordToAdd = licenseValueSource[i];
						break;
					}
				}
			}

			console.log('recordToAdd = ', recordToAdd);

			// 만약에 드랍하려고 하는 곳에 이미 똑같은 데이터가 있으면 ?
			if (dragType === 'AWARD') {
				for (var i = 0; i < awardValueLen; i++) {
					if (result.draggableId === awardValue[i].id) {
						alert('이미 추가한 데이터입니다.');
						return;
					}
				}
			}
			if (dragType === 'EDUCATION') {
				for (var i = 0; i < educationValueLen; i++) {
					if (result.draggableId === educationValue[i].id) {
						alert('이미 추가한 데이터입니다.');
						return;
					}
				}
			}
			if (dragType === 'LICENSE') {
				for (var i = 0; i < licenseValueLen; i++) {
					if (result.draggableId === licenseValue[i].id) {
						alert('이미 추가한 데이터입니다.');
						return;
					}
				}
			}

			// 추가하기
			let Array1 = [];
			let Array = Array1.concat(...awardValue, ...educationValue, ...licenseValue);

			// console.log('Array = ', Array);

			const Array_Award = [...awardValue];
			const Array_Education = [...educationValue];
			const Array_LicenseDto = [...licenseValue];

			for (let i = 0; i < Array.length; i++) {
				if (recordToAdd.type === 'AWARD') {
					Array_Award.push(recordToAdd);
					break;
				}
				if (recordToAdd.type === 'EDUCATION') {
					Array_Education.push(recordToAdd);
					break;
				}
				if (recordToAdd.type === 'LICENSE') {
					Array_LicenseDto.push(recordToAdd);
					break;
				}
			}

			const ResultArrayForSend = {};
			ResultArrayForSend.portfolioDto = destColumn.items.portfolioDto;
			ResultArrayForSend.awardDtoList = Array_Award;
			ResultArrayForSend.educationDtoList = Array_Education;
			ResultArrayForSend.licenseDtoList = Array_LicenseDto;
			ResultArrayForSend.resumeDtoList = [destColumn.items.portfolioDto];

			dispatch(DragdataChangePort(ResultArrayForSend));
		} else {
			return;
		}
	};
	const onClickShowPort1 = () => {
		setPortState([true, false, false]);
	};
	const onClickShowPort2 = () => {
		alert('아직 개발중인 기능입니다');

		// setPortState([false, true, false]);
	};
	const onClickShowPort3 = () => {
		alert('아직 개발중인 기능입니다');

		// setPortState([false, false, true]);
	};
	const onClickAddPort = () => {
		alert('아직 개발중인 기능입니다');
	};

	return (
		<div className="Container">
			<div className="DragDropBtnBox">
				<PortBtn className="PortBtn" active={portState[0]} onClick={onClickShowPort1}>
					포트폴리오 1
				</PortBtn>
				<PortBtn className="PortBtn" active={portState[1]} onClick={onClickShowPort2}>
					포트폴리오 2
				</PortBtn>
				<PortBtn className="PortBtn" active={portState[2]} onClick={onClickShowPort3}>
					포트폴리오 3
				</PortBtn>
				<button className="PlusBtn" onClick={onClickAddPort}>
					+
				</button>
			</div>
			<DragDropContext onDragEnd={result => onDragEnd(result)}>
				<div className="DragDropContentBox">
					<div className="RawDataBox">
						<RawDataComponent originData={originData} />
					</div>
					<div className="PortPolioBox">
						<PortPolioComponent showState={portState} portData={portData} />
					</div>
				</div>
			</DragDropContext>
		</div>
	);
}

export default ChangeData;
