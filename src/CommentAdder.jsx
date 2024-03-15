import { useContext, useState } from "react";
import { UserContext } from "./contexts/User";
import { postComment } from "./api";

export const CommentAdder = ({ singleArticle, onUpdateComments }) => {
  const [commentText, setCommentText] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const [isPosted, setIsPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    setIsPosting(true);
    event.preventDefault();
    const commentBody = {
      username: loggedInUser.username,
      body: commentText,
    };
    postComment(singleArticle.article_id, commentBody)
      .then(() => {
        setIsPosting(false);
        setIsPosted(true);
        setCommentText("");
        onUpdateComments(singleArticle.article_id);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <section className="comment-adder-section">
      <div className="comment-adder-box">
        <p>comment as {loggedInUser.username}</p>
        <form onSubmit={handleSubmit} className="comment-adder-form">
          <textarea
            type="text"
            placeholder="What are your thoughts?"
            required
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button disabled={isPosting}>Post</button>
          {isError && <p>Unable to post comment</p>}
        </form>
      </div>
    </section>
  );
};
