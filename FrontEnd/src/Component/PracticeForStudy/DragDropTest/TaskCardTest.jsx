import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import '../../Style/Component/KanbanTest.css';

const TaskCardTest = props => {
	const { item, index, datatype, columns, setColumns, columnsPort1, setColumnsPort1 } = props;

	// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	// console.log('item = ', item);
	// console.log('index = ', index);
	// console.log('datatype = ', datatype);

	const onClickDelete = itemID => {
		// console.log('itemID = ', itemID);

		// console.log('columns = ', columns);

		const originColumn = columns['origin'];
		const sourceColumn = columnsPort1['1'];
		// console.log('originColumn = ', originColumn);
		// console.log('sourceColumn = ', sourceColumn);

		// const destColumn = columns[1];

		const originItems = [...originColumn.items];
		const sourceItems = [...sourceColumn.items];

		const lengthOrigin = originItems.length;

		// const destItems = [...destColumn.items];
		// console.log('sourceItems = ', sourceItems);
		// const items = columns["2"].items;
		// console.log('before = ', destItems);
		// console.log('Before : ', columns);

		for (let i = 0; i < sourceItems.length; i++) {
			// console.log('i = ', i);
			// console.log(destItems[i]);

			if (sourceItems[i].id === itemID) {
				const [removed] = sourceItems.splice(i, 1);
				// console.log('removed = ', removed);
				// console.log('찾았다');
				// sourceItems.splice(i, 1);
				originItems.splice(lengthOrigin, 0, removed);
				break;
			}
		}

		// console.log('after = ', destItems);

		setColumns({
			origin: {
				...originColumn,
				items: originItems,
			},
		});
		setColumnsPort1({
			...columnsPort1,
			1: {
				...sourceColumn,
				items: sourceItems,
			},
		});

		// console.log('After : ', columns);
	};
	return (
		<div>
			{datatype === 'origin' ? (
				<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<div className="TaskInformationT">
								<h1>{item.Type}</h1>
								<p>{item.Content}</p>
							</div>
						</div>
					)}
				</Draggable>
			) : (
				<div>
					<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<div className="TaskInformationT">
									<h1>{item.Type}</h1>
									<p>{item.Content}</p>
								</div>
								<button onClick={e => onClickDelete(item.id)}>삭제</button>
							</div>
						)}
					</Draggable>
				</div>
			)}
		</div>
	);
};

export default TaskCardTest;
