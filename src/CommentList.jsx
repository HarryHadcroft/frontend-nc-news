import { useEffect, useState } from "react"
import { fetchCommentsByArticleId } from "./api"

export const CommentList = ({ article_id }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchCommentsByArticleId(article_id).then((comments) => {
            setComments(comments)
        })
    }, [])

    return(
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