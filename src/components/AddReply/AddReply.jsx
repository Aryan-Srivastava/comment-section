import { useState } from "react";

function AddReply({
  addNewReply,
  currentUser,
  parent,
  showReply,
  setShowReply,
  parentUser,
}) {
  const [reply, setReply] = useState(`@${parentUser.username}, `);

  const onSubmit = () => {
    const currentDate = new Date();
    const timeAgo = new Intl.RelativeTimeFormat("en", { style: "narrow" });
    const time = -Math.round((currentDate - new Date()) / 1000 / 60 / 60 / 24);
    let newContentReply = reply.replace(`@${parentUser.username},`, "");
    const newReply = {
      id: Date.now(),
      content: newContentReply,
      createdAt: timeAgo.format(time, "days"),
      score: 0,
      replyingTo: parentUser.username,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };
    setReply("@username ");
    addNewReply(newReply, parent.id);
    setShowReply(!showReply);
  };

  return (
    <div className="add-comment">
      <textarea
        type="text"
        name="comment"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <div className="footer">
        <img
          src="../src/assets/avatars/image-juliusomo.png"
          alt="avatar image"
        />
        <button onClick={onSubmit}>Reply</button>
      </div>
    </div>
  );
}

export default AddReply;
