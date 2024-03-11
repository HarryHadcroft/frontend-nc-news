export const CommentCard = ({ comments }) => {
    return (
        <section>
            {comments.map((comment) => {
                return(
                    <div key={comment.comment_id}className="comment-card">
                        <p>{comment.author}</p>
                        <p>{comment.body}</p>
                        <p>votes {comment.votes}</p>
                    </div>
                )
            })}
        </section>
    )
}