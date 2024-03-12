import { useContext } from "react";
import { UserContext } from "./contexts/User";
import { deleteComment } from "./api";

export const CommentCard = ({ comments }) => {
  const { loggedInUser } = useContext(UserContext);

  const handleDelete = (comment_id) => {
    deleteComment(comment_id).then(() => {
      console.log("deleted comment")
    })
  }

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
              <button onClick={() => {handleDelete(comment.comment_id)}}>
                Delete comment
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
};
