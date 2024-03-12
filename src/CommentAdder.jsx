import { useContext, useState } from "react";
import { UserContext } from "./contexts/User";
import { postComment } from "./api";

export const CommentAdder = ({ singleArticle }) => {
  const [commentText, setCommentText] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const [isPosted, setIsPosted] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = (event) => {
    setIsPosting(true)
    event.preventDefault()
    const commentBody = {
      username: loggedInUser.username,
      body: commentText
    };
    postComment(singleArticle.article_id, commentBody).then(() => {
        setIsPosting(false)
        setIsPosted(true)
    })
  };

  if(isPosting){
    return(
        <p>Posting comment...</p>
    )
  }
  if(isPosted){
    return(
        <p>Comment posted!</p>
    )
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <p>comment as {loggedInUser.username}</p>
        <textarea
          type="text"
          placeholder="What are your thoughts?"
          required
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button>Post Comment</button>
      </form>
    </section>
  );
};
