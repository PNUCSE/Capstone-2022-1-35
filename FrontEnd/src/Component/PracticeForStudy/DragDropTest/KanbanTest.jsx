import React, { useState } from 'react';
// import styled from '@emotion/styled';
// import '../../Style/Component/KanbanTest.css';

import { columnsFromBackend, port1, port2, port3 } from './KanbanDataTest';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCardTest from './TaskCardTest';

const KanbanTest = () => {
	const [port1State, setPort1State] = useState(true);
	const [port2State, setPort2State] = useState(false);
	const [port3State, setPort3State] = useState(false);

	const [columns, setColumns] = useState(columnsFromBackend);
	const [columnsPort1, setColumnsPort1] = useState(port1);
	const [columnsPort2, setColumnsPort2] = useState(port2);
	const [columnsPort3, setColumnsPort3] = useState(port3);

	const onDragEnd = (
		result,
		columns,
		setColumns,
		columnsPort1,
		setColumnsPort1,
		columnsPort2,
		setColumnsPort2,
		columnsPort3,
		setColumnsPort3
	) => {
		console.log(result);
		// DND 했을 때
		// result =>  destination: {droppableId: '1', index: 1}
		// 			  draggableId: "1"
		//			  source: {index: 0, droppableId: 'origin'}

		if (!result.destination) return;
		// 다른 곳에 놔뒀을 때 바로 리턴

		const { source, destination } = result;
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			let destColumn = [];
			let portNum = 0;
			// 내 데이터 정보 -> row data
			if (destination.droppableId === '1') {
				destColumn = columnsPort1[destination.droppableId];
				portNum = 1;
			}
			if (destination.droppableId === '2') {
				destColumn = columnsPort2[destination.droppableId];
				portNum = 2;
			}
			if (destination.droppableId === '3') {
				destColumn = columnsPort3[destination.droppableId];
				portNum = 3;
			}

			// console.log('sourceColumn = ', sourceColumn);
			// console.log('destColumn = ', destColumn);

			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];

			console.log('sourceItems = ', sourceItems);
			console.log('destItems = ', destItems);

			const [removed] = sourceItems.splice(source.index, 1);
			// console.log('removed = ', removed);

			// sourceItems.splice(source.index, 0, removed);
			// 옮겼는거 다시 오리지날에다가 복구

			destItems.splice(destination.index, 0, removed);
			// 새로 추가

			if (portNum === 1) {
				setColumns({
					...columns,
					[source.droppableId]: {
						...sourceColumn,
						items: sourceItems,
					},
				});
				setColumnsPort1({
					...columnsPort1,
					[destination.droppableId]: {
						...destColumn,
						items: destItems,
					},
				});
			}

			if (portNum === 2) {
				setColumns({
					...columns,
					[source.droppableId]: {
						...sourceColumn,
						items: sourceItems,
					},
				});
				setColumnsPort2({
					...columnsPort2,
					[destination.droppableId]: {
						...destColumn,
						items: destItems,
					},
				});
			}

			if (portNum === 3) {
				setColumns({
					...columns,
					[source.droppableId]: {
						...sourceColumn,
						items: sourceItems,
					},
				});
				setColumnsPort3({
					...columnsPort3,
					[destination.droppableId]: {
						...destColumn,
						items: destItems,
					},
				});
			}
		}
	};

	const onClickShowPort1 = () => {
		setPort1State(true);
		setPort2State(false);
		setPort3State(false);
	};
	const onClickShowPort2 = () => {
		setPort1State(false);
		setPort2State(true);
		setPort3State(false);
	};
	const onClickShowPort3 = () => {
		setPort1State(false);
		setPort2State(false);
		setPort3State(true);
	};

	return (
		<DragDropContext
			onDragEnd={result =>
				onDragEnd(
					result,
					columns,
					setColumns,
					columnsPort1,
					setColumnsPort1,
					columnsPort2,
					setColumnsPort2,
					columnsPort3,
					setColumnsPort3
				)
			}
		>
			<div className="ContainerT">
				<div className="DragDropBtnBoxT">
					<button onClick={onClickShowPort1}> 포트폴리오 1 </button>
					<button onClick={onClickShowPort2}> 포트폴리오 2 </button>
					<button onClick={onClickShowPort3}> 포트폴리오 3 </button>
				</div>

				<div className="TaskColumnStylesT">
					{Object.entries(columns).map(([columnId, column], index) => {
						console.log('columns = ', columns);
						// origin: {title: '나의 데이터', items: Array(3)}
						console.log('columns columnId= ', columnId);
						// columnId = origin
						console.log('columns column= ', column);
						// column=  {title: '나의 데이터', items: Array(3)}
						console.log('columns index = ', columns.index);
						// undefinde

						return (
							<Droppable key={columnId} droppableId={columnId}>
								{(provided, snapshot) => (
									<div
										className="TaskListT"
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										<div>
											<span className="TitleT">{column.title}</span>
											{column.items.map((item, index) => (
												<TaskCardTest
													key={item.id}
													item={item}
													index={index}
													datatype="origin"
													columns={columns}
													setColumns={setColumns}
													columnsPort1={columnsPort1}
													setColumnsPort1={setColumnsPort1}
												/>
											))}
										</div>

										{provided.placeholder}
									</div>
								)}
							</Droppable>
						);
					})}

					<div className="portpolioBoxT">
						{port1State ? (
							<>
								{Object.entries(columnsPort1).map(([columnId, column], index) => {
									return (
										<Droppable key={columnId} droppableId={columnId}>
											{(provided, snapshot) => (
												<div
													className="portpolioListT"
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													<div>
														<span className="TitleT">
															{column.title}
														</span>
														{column.items.map((item, index) => (
															<TaskCardTest
																key={item.id}
																item={item}
																index={index}
																datatype=""
																columns={columns}
																setColumns={setColumns}
																columnsPort1={columnsPort1}
																setColumnsPort1={setColumnsPort1}
															/>
														))}
													</div>

													{provided.placeholder}
												</div>
											)}
										</Droppable>
									);
								})}
							</>
						) : (
							<></>
						)}
						{port2State ? (
							<>
								{Object.entries(columnsPort2).map(([columnId, column], index) => {
									return (
										<Droppable key={columnId} droppableId={columnId}>
											{(provided, snapshot) => (
												<div
													className="portpolioListT"
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													<div>
														<span className="TitleT">
															{column.title}
														</span>
														{column.items.map((item, index) => (
															<TaskCardTest
																key={item.id}
																item={item}
																index={index}
																datatype=""
																columns={columnsPort2}
																setColumns={setColumnsPort2}
															/>
														))}
													</div>

													{provided.placeholder}
												</div>
											)}
										</Droppable>
									);
								})}
							</>
						) : (
							<></>
						)}
						{port3State ? (
							<>
								{Object.entries(columnsPort3).map(([columnId, column], index) => {
									return (
										<Droppable key={columnId} droppableId={columnId}>
											{(provided, snapshot) => (
												<div
													className="portpolioListT"
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													<div>
														<span className="TitleT">
															{column.title}
														</span>
														{column.items.map((item, index) => (
															<TaskCardTest
																key={item.id}
																item={item}
																index={index}
																datatype=""
																columns={columnsPort3}
																setColumns={setColumnsPort3}
															/>
														))}
													</div>

													{provided.placeholder}
												</div>
											)}
										</Droppable>
									);
								})}
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
};

export default KanbanTest;
