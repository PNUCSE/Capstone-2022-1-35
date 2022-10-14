import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import { DeletedataChangePort, selectPortData } from 'Redux/PortdataSlice';
import './DragDropComponent.css';

const TaskCard = props => {
	const { item, index, datatype } = props;
	const dispatch = useDispatch();
	const portData = useSelector(selectPortData);

	const onClickDelete = itemID => {
		const sourceColumn = portData.port1;

		const sourceItemsAward = [sourceColumn.items.awardDtoList];
		const sourceItemsEducation = [sourceColumn.items.educationDtoList];
		const sourceItemsLicenseDtoList = [sourceColumn.items.licenseDtoList];

		let sourceItems = [];
		let After = [];

		let Array = sourceItems.concat(
			...sourceItemsAward,
			...sourceItemsEducation,
			...sourceItemsLicenseDtoList
		);

		for (let i = 0; i < Array.length; i++) {
			if (Array[i].id == itemID) {
				let First = Array.slice(0, i);
				let Second = Array.slice(i + 1);
				After = [...First, ...Second];
				break;
			}
		}
		const Array_Award = [];
		const Array_Education = [];
		const Array_LicenseDto = [];

		for (let i = 0; i < After.length; i++) {
			if (After[i].type === 'AWARD') {
				Array_Award.push(After[i]);
			}
			if (After[i].type === 'EDUCATION') {
				Array_Education.push(After[i]);
			}
			if (After[i].type === 'LICENSE') {
				Array_LicenseDto.push(After[i]);
			}
		}

		const ResultArrayForSend = {};
		ResultArrayForSend.portfolioDto = sourceColumn.items.portfolioDto;
		ResultArrayForSend.awardDtoList = Array_Award;
		ResultArrayForSend.educationDtoList = Array_Education;
		ResultArrayForSend.licenseDtoList = Array_LicenseDto;
		ResultArrayForSend.resumeDtoList = [sourceColumn.items.portfolioDto];

		dispatch(DeletedataChangePort(ResultArrayForSend));
	};

	const showPortData = item => {
		if (item.type === 'LICENSE') {
			return (
				<div className="PortItem">
					<div
						style={{
							background: 'transparent',
						}}
					>
						<p
							style={{
								fontSize: '18px',
								fontWeight: '900',
								margin: '5px',
							}}
						>
							{item.title}
						</p>
						<p style={{ fontSize: '13px', margin: '5px' }}>
							{item.publishedAt}
							{/* {console.log('item.publishedAt = ', item.publishedAt)} */}
							{item.createAt}
							{/* {console.log('item.createAt = ', item.createAt)} */}

							{/* 생성된 날짜? */}
						</p>
					</div>
					<div>
						<button onClick={e => onClickDelete(item.id)}>x</button>
					</div>
				</div>
			);
		}
		if (item.type === 'EDUCATION') {
			return (
				<div className="PortItem">
					<div
						style={{
							background: 'transparent',
						}}
					>
						<p
							style={{
								fontSize: '18px',
								fontWeight: '900',
								margin: '5px',
							}}
						>
							{item.departmentInfo}
						</p>
						<p style={{ fontSize: '13px', margin: '5px' }}>
							{item.publishedAt}
							{item.createAt}
						</p>
					</div>
					<div>
						<button onClick={e => onClickDelete(item.id)}>x</button>
					</div>
				</div>
			);
		}
		if (item.type === 'AWARD') {
			return (
				<div className="PortItem">
					<div
						style={{
							background: 'transparent',
						}}
					>
						<p
							style={{
								fontSize: '18px',
								fontWeight: '900',
								margin: '5px',
							}}
						>
							{item.title} {item.rank}
						</p>
						<p style={{ fontSize: '13px', margin: '5px' }}>
							{item.publishedAt}
							{item.createAt}
						</p>
					</div>
					<div>
						<button onClick={e => onClickDelete(item.id)}>x</button>
					</div>
				</div>
			);
		}
	};
	return (
		<>
			{datatype === 'origin' ? (
				<div className="OriginDataBox">
					<Draggable key={item.id} draggableId={item.id} index={index}>
						{provided => (
							<div
								className="OriginDataContent"
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<p>
									{item.title} {item.rank}
								</p>
							</div>
						)}
					</Draggable>
				</div>
			) : (
				showPortData(item)
			)}
		</>
	);
};

export default TaskCard;
