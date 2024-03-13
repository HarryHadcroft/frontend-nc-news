import { useContext, useState } from "react";
import { UserContext } from "./contexts/User";
import { deleteComment } from "./api";

export const CommentCard = ({ comments, onUpdateComments, article_id }) => {
  const { loggedInUser } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState(null);

  const handleDelete = (comment_id) => {
    setIsDeleting(true);
    setDeletedCommentId(comment_id)
    deleteComment(comment_id)
      .then(() => {;
        setTimeout(() => {
          setIsDeleting(false);
          setDeletedCommentId(null)
        }, 3000);
        onUpdateComments(article_id);
      })
      .catch((err) => {
        setIsError(true);
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
            {isError && deletedCommentId === comment.comment_id && (
              <p>Unable to delete comment</p>
            )}
          </div>
        );
      })}
    </section>
  );
};
