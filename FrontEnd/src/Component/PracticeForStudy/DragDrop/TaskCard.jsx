import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import '../../Style/Component/Kanban.css';

const TaskCard = ({ item, index, datatype, columns, setColumns, columnId }) => {
	// console.log('column = ', column.items);

	const onClickDelete = itemID => {
		// console.log('itemID = ', itemID);
		// console.log('original = ', columns);

		const sourceColumn = columns[1];
		const destColumn = columns[2];

		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];

		// const items = columns["2"].items;
		// console.log('before = ', destItems);

		for (let i = 0; i < destItems.length; i++) {
			// console.log('i = ', i);
			// console.log(destItems[i]);

			if (destItems[i].id === itemID) {
				// console.log('찾았다');
				destItems.splice(i, 1);
				break;
			}
		}
		// console.log('after = ', destItems);

		setColumns({
			...columns,
			1: {
				...sourceColumn,
				items: sourceItems,
			},
			2: {
				...destColumn,
				items: destItems,
			},
		});
	};
	return (
		<div>
			{datatype === 'origin' ? (
				<Draggable key={item.id} draggableId={item.id} index={index}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<div className="TaskInformation">
								<h1>{item.Type}</h1>
								<p>{item.Content}</p>
							</div>
						</div>
					)}
				</Draggable>
			) : (
				<div>
					<Draggable key={item.id} draggableId={item.id} index={index}>
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<div className="TaskInformation">
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

export default TaskCard;
