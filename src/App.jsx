import "./App.css";
import { AddComment, Comment, Modal, Replies } from "./components";
import data from "./data/data.json";
import { useState } from "react";

function App() {
	const [scores, setScores] = useState(
		data.comments.concat(
			data.comments
				.map(({ replies }) => replies)
				.flat()
				.map(({ id, score }) => ({ id, score }))
		)
	);
	const [datas, setDatas] = useState(data);
	const [showModal, setShowModal] = useState(false);
	const [initialScores, setInitialScores] = useState(scores);
	const [selectedReplyId, setSelectedReplyId] = useState(null);

	const handleScoreChange = (id, value) => {
		const currentScore = scores.find(
			({ id: scoreId }) => scoreId === id
		).score;
		const initialScore = initialScores.find(
			({ id: scoreId }) => scoreId === id
		).score;

		if (
			(currentScore > initialScore && value === 1) ||
			(currentScore < initialScore && value === -1)
			// (currentScore === 0 && value === -1)
		)
			return;
		setScores((prevScore) =>
			prevScore.map((scoreObj) =>
				scoreObj.id === id
					? { id, score: currentScore + value }
					: scoreObj
			)
		);
	};

	const handleShowModal = (id) => {
		setSelectedReplyId(id);
		setShowModal(true);
	};

	const handleHideModal = () => {
		setShowModal(false);
	};

	const handleDeleteReply = (selectedReplyId) => {
		setDatas((prevData) => {
			return {
				...prevData,
				comments: prevData.comments
					.map((comment) => {
						if (comment.id === selectedReplyId) {
							return null;
						}
						return {
							...comment,
							replies: comment.replies.filter(
								(reply) => reply.id !== selectedReplyId
							),
						};
					})
					.filter((comment) => comment !== null),
			};
		});
		setShowModal(false);
	};

	const editComment = (content, id) => {
		setDatas((prevData) => {
			const updatedComments = prevData.comments.map((comment) => {
				if (comment.id === id) {
					return {
						...comment,
						content,
					};
				}
				const updatedReplies = comment.replies.map((reply) => {
					if (reply.id === id) {
						return {
							...reply,
							content,
						};
					}
					return reply;
				});
				return { ...comment, replies: updatedReplies };
			});
			return { ...prevData, comments: updatedComments };
		});
	};

	const handleNewComment = (newComment) => {
		setScores([...scores, { id: newComment.id, score: newComment.score }]);
		setInitialScores([
			...scores,
			{ id: newComment.id, score: newComment.score },
		]);
		setDatas((prevData) => ({
			...prevData,
			comments: [...prevData.comments, newComment],
		}));
	};

	const handleNewReply = (newReply, parentId) => {
		setScores([...scores, { id: newReply.id, score: newReply.score }]);
		setInitialScores([
			...scores,
			{ id: newReply.id, score: newReply.score },
		]);
		setDatas((prevData) => {
			const updatedComments = prevData.comments.map((comment) => {
				if (comment.id === parentId) {
					return {
						...comment,
						replies: [...comment.replies, newReply],
					};
				}
				return comment;
			});
			return { ...prevData, comments: updatedComments };
		});
	};

	return (
		<div className="App">
			{datas.comments.map((comment) => (
				<Comment
					key={comment.id}
					comment={comment}
					score={scores.find(({ id }) => id === comment.id).score}
					onPlusScore={() => handleScoreChange(comment.id, 1)}
					onMinusScore={() => handleScoreChange(comment.id, -1)}
					currentUser={data.currentUser}
					onModal={() => handleShowModal(comment.id)}
					editComment={editComment}
					addNewReply={handleNewReply}
				>
					<div className="replies">
						{comment.replies.map((reply) => (
							<Replies
								key={reply.id}
								reply={reply}
								score={
									scores.find(({ id }) => id === reply.id)
										.score
								}
								onPlusScore={() =>
									handleScoreChange(reply.id, 1)
								}
								onMinusScore={() =>
									handleScoreChange(reply.id, -1)
								}
								currentUser={data.currentUser}
								onModal={() => handleShowModal(reply.id)}
								editComment={editComment}
								addNewReply={handleNewReply}
								parent={comment}
							/>
						))}
					</div>
				</Comment>
			))}
			<AddComment
				addNewComment={handleNewComment}
				currentUser={data.currentUser}
			/>
			{showModal && (
				<Modal
					onCancel={() => handleHideModal()}
					onDelete={() => handleDeleteReply(selectedReplyId)}
				/>
			)}
		</div>
	);
}

export default App;
