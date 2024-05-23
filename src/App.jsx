import { useState } from 'react';
import './app.css';

const App = () => {
	const [boards, setBoards] = useState([
		{id: 1, title: 'Todo', items: [ {id: 1, title: 'go to shop'}, {id: 2, title: 'make hw'} ]},
		{id: 2, title: 'Check', items: [ {id: 3, title: 'learn React'}, {id: 4, title: 'create final project'} ]},
		{id: 3, title: 'Done', items: [ {id: 5, title: 'go to the cinema'}, {id: 6, title: 'by the notebook'} ]},
	]);

	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

	const dragOverHandler = (e) => {
		e.preventDefault();

		if (e.target.className == 'item') {
			e.target.style.boxShadow = '0 2px 3px gray';
		}
	}

	const dragLeaveHandler = (e) => {
		e.target.style.boxShadow = 'none';
	}

	const dragStartHandler = (e, board, item) => {
		setCurrentBoard(board);
		setCurrentItem(item);
	}

	const dragEndHandler = (e) => {
		e.target.style.boxShadow = 'none';
	}

	const dropHandler = (e, board, item) => {
		e.preventDefault();

		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);

		const dropIndex = board.items.indexOf(item);
		board.items.splice(dropIndex + 1, 0, currentItem);

		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board;
			}
			if (b.id === currentBoard.id) {
				return currentBoard;
			}

			return b
		}));

		e.target.style.boxShadow = 'none';
	}

	const dropCardHandler = (e, board) => {
		board.items.push(currentItem);
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);

		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board;
			}
			if (b.id === currentBoard.id) {
				return currentBoard;
			}

			return b
		}));

		e.target.style.boxShadow = 'none';
	}

	return (
		<div className="app">

			{
				boards.map(board => (
					<div 
						className="board"
						onDragOver={ e => dragOverHandler(e) }
						onDrop={ e => dropCardHandler(e, board) } 
					>
						<div className="board__title">{ board.title }</div>
						{
							board.items.map(item => (
								<div
									onDragOver={ e => dragOverHandler(e) }
									onDragLeave={ e => dragLeaveHandler(e) }
									onDragStart={ e => dragStartHandler(e, board, item) }
									onDragEnd={ e => dragEndHandler(e) }
									onDrop={ e => dropHandler(e, board, item) } 
									draggable={ true } 
									className="item"
								>
										{ item.title }
								</div>
							))
						}
					</div>
				))
			}

		</div>
	);
}

export default App;
