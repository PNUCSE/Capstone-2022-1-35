import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import TaskCard from './TaskCard';

import { LoadRawData } from 'Redux/RawdataSlice';

export const ProvidedPlaceholder = styled.span`
	display: 'none';
`;

const RawDataComponent = props => {
	const { originData } = props;

	console.log('여기는 RawDataComponent \n LoadRawData 실행해');
	LoadRawData();

	function returnTaskCard() {
		const info0 = originData;

		// for (var index = 0; index < 3; index++) {
		// 	if (index === 0) {
		// 		var innerLen = column[index].length;
		// 		for (var innerindex = 0; innerindex < innerLen; innerindex++) {
		// 			info0.push([column[index][innerindex], 1 + index + innerindex]);
		// 		}
		// 	}
		// 	if (index === 1) {
		// 		innerLen = column[index].length;
		// 		for (innerindex = 0; innerindex < innerLen; innerindex++) {
		// 			info1.push([column[index][innerindex], 2 + index + innerindex]);
		// 		}
		// 	}
		// 	if (index === 2) {
		// 		innerLen = column[index].length;
		// 		for (innerindex = 0; innerindex < innerLen; innerindex++) {
		// 			info2.push([column[index][innerindex], 3 + index + innerindex]);
		// 		}
		// 	}
		// }
		// console.log(info0.origin.items.awardDtoList);
		return (
			<Fragment>
				<div className="DataBox">
					<p className="DataBoxh1"> 수상내역 </p>
					{/* <div>{info0.origin.items.awardDtoList[0].type}</div> */}

					{info0.origin.items.awardDtoList.map(items => {
						return (
							<TaskCard
								key={items.id}
								item={items}
								index={items.ownerId}
								datatype="origin"
							/>
						);
					})}
				</div>
				<div className="DataBox">
					<p className="DataBoxh1"> 학력 </p>
					{info0.origin.items.educationDtoList.map(items => {
						return (
							<TaskCard
								key={items.id}
								item={items}
								index={items.ownerId}
								datatype="origin"
							/>
						);
					})}
				</div>
				<div className="DataBox">
					<p className="DataBoxh1"> 자격증 </p>
					{info0.origin.items.licenseDtoList.map(items => {
						return (
							<TaskCard
								key={items.id}
								item={items}
								index={items.ownerId}
								datatype="origin"
							/>
						);
					})}
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Droppable key={originData.origin.title} droppableId={originData.origin.title}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="ColumnTitleBox">
							{' '}
							<p>드래그 앤 드랍 방식을 통해</p>
							<p> 편리하게 나의 데이터를 옮겨보세요!</p>
						</div>
						<h1 className="ColumnTitle1">{originData.origin.title}</h1>

						{returnTaskCard()}

						<ProvidedPlaceholder>{provided.placeholder}</ProvidedPlaceholder>
					</div>
				)}
			</Droppable>
		</Fragment>
	);
};

export default RawDataComponent;
