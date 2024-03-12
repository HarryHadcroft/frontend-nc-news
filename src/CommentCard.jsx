import { useContext, useState } from "react";
import { UserContext } from "./contexts/User";
import { deleteComment } from "./api";

export const CommentCard = ({ comments }) => {
  const { loggedInUser } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (comment_id) => {
    setIsDeleting(true)
    deleteComment(comment_id).then(() => {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setIsDeleting(false)
      }, 3000);
    });
  };

  return (
    <section>
      {comments.map((comment) => {
        const canDelete = comment.author === loggedInUser.username;

        return (
          <div key={comment.comment_id} className="comment-card">
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>votes {comment.votes}</p>
            {canDelete && (
              <button
                onClick={() => {
                  handleDelete(comment.comment_id);
                }}
                disabled={isDeleting}
              >
                Delete comment
              </button>
            )}
            {showConfirmation && <p>Comment deleted</p>}
          </div>
        );
      })}
    </section>
  );
};
