// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// export const MainPageDiv = styled.div`
// 	width: 100%;
// 	height: 100%;
// 	border: 5px solid black;
// 	overflow-y: scroll;
// `;

// function MainPage() {
// 	const navigator = useNavigate();

// 	const onClickMoveDragDrop = () => {
// 		navigator('/dragdrop');
// 	};

// 	const onClickMoveDragDrop2 = () => {
// 		navigator('/dragdroptest');
// 	};

// 	const onClickMoveDragDrop3 = () => {
// 		navigator('/dragdroptestredux');
// 	};

// 	return (
// 		<MainPageDiv id="MainPageDiv">
// 			<div style={{ margin: '100px' }}>
// 				<h1> 드래그 앤 드랍 구현 - origin</h1>
// 				<button onClick={onClickMoveDragDrop}>move to DragDrop </button>
// 			</div>
// 			<div style={{ margin: '100px' }}>
// 				<h1> 드래그 앤 드랍 구현 - test</h1>
// 				<button onClick={onClickMoveDragDrop2}>move to DragDrop - test </button>
// 			</div>
// 			<div style={{ margin: '100px' }}>
// 				<h1> 드래그 앤 드랍 구현 - using Redux </h1>
// 				<button onClick={onClickMoveDragDrop3}>move to DragDrop Redux- test </button>
// 			</div>

// 			{/* <MoveTopBtn active={MoveToTopBtnStatus} onClick={moveToTop} href="moveToTop"> */}
// 		</MainPageDiv>
// 	);
// }

// export default MainPage;
