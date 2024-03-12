import { useContext } from "react";
import { UserContext } from "./contexts/User";

export const CommentCard = ({ comments }) => {
  const { loggedInUser } = useContext(UserContext);
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
              <button onClick={() => handleDelete(comment.comment_id)}>
                Delete comment
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
};
