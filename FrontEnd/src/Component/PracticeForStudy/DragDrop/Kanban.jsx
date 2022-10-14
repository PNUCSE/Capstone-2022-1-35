import React, { useState } from 'react';
// import styled from '@emotion/styled';
// import '../../Style/Component/Kanban.css';

import { columnsFromBackend } from './KanbanData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Kanban = () => {
	const [columns, setColumns] = useState(columnsFromBackend);

	// useEffect(() => {
	// 	console.log('columns = ', columns);
	// }, [columns]);

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[1];
			// 내 데이터 정보 -> row data

			const destColumn = columns[2];
			// 자기소개서에 데이터 정보 -> 새로 추가할 내용

			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);

			sourceItems.splice(destination.index, 0, removed);
			// 옮겼는거 다시 오리지날에다가 복구

			destItems.splice(destination.index, 0, removed);
			// 새로 추가

			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			});
		}
		// else {
		// const column = columns[source.droppableId];
		// const copiedItems = [...column.items];
		// const [removed] = copiedItems.splice(source.index, 1);
		// copiedItems.splice(destination.index, 0, removed);
		// setColumns({
		// 	...columns,
		// 	[source.droppableId]: {
		// 		...column,
		// 		items: copiedItems,
		// 	},
		// });

		// 다른 범위에다가 놓으면(같은 곳이던가) => 그냥 리턴
		// return;
		// }
	};
	return (
		<DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
			<div className="Container">
				<div className="TaskColumnStyles">
					{Object.entries(columns).map(([columnId, column], index) => {
						return (
							<Droppable key={column.title} droppableId={columnId}>
								{(provided, snapshot) => (
									<div
										className="TaskList"
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{column.title === '나의 데이터' ? (
											// <div style={{ width: '50%' }}>
											<div>
												<span className="Title">{column.title}</span>
												{column.items.map((item, index) => (
													<TaskCard
														key={index}
														item={item}
														index={index}
														datatype="origin"
														columns={columns}
														setColumns={setColumns}
													/>
												))}
											</div>
										) : (
											<div>
												<span className="Title">{column.title}</span>
												{column.items.map((item, index) => (
													<TaskCard
														key={item}
														item={item}
														index={index}
														datatype=""
														columns={columns}
														setColumns={setColumns}
														columnId={columnId}
													/>
												))}
											</div>
										)}

										{provided.placeholder}
									</div>
								)}
							</Droppable>
						);
					})}
				</div>
			</div>
		</DragDropContext>
	);
};

export default Kanban;
