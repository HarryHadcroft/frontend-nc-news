export const CommentCard = ({ comments, setComments }) => {

    const handleVote = (comment_id, increase) => {
        setComments((currComments) => {
            return currComments.map((comment) => {
                if(comment_id === comment.comment_id && increase){
                    return {...comment, votes: comment.votes + 1}
                }else if(comment_id === comment.comment_id && !increase){
                    return {...comment, votes: comment.votes - 1}
                }
                return comment
            })
        })
    }

  return (
    <section>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment-card">
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <button onClick={() => {handleVote(comment.comment_id, true)}}> Like </button>
            <button onClick={() => {handleVote(comment.comment_id, false)}}> Dislike</button>
            <p>{comment.votes}</p>
          </div>
        );
      })}
    </section>
  );
};
