import { useState } from "react";
import "./AddComment.css";

function AddComment({ addNewComment, currentUser }) {
  const [comment, setComment] = useState("");

  const onSubmit = () => {
    const currentDate = new Date();
    const timeAgo = new Intl.RelativeTimeFormat("en", { style: "narrow" });
    const time = -Math.round((currentDate - new Date()) / 1000 / 60 / 60 / 24);
    const newComment = {
      id: Date.now(),
      content: comment,
      createdAt: timeAgo.format(time, "days"),
      score: 0,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replies: [],
    };
    addNewComment(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <textarea
        type="text"
        name="comment"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="footer">
        <img
          src="../src/assets/avatars/image-juliusomo.png"
          alt="avatar image"
        />
        <button onClick={onSubmit}>Send</button>
      </div>
    </div>
  );
}

export default AddComment;
