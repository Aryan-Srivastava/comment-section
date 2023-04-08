import "./Modal.css";

function Modal({ onCancel, onDelete }) {
  return (
    <div className="modal">
      <div className="modal-container">
        <h3>Delete Comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="wrap-btns">
          <button onClick={onCancel}>No, cancel</button>
          <button onClick={onDelete}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
