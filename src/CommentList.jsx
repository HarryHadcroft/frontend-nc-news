import { useEffect } from "react"
import { fetchCommentsByArticleId } from "./api"
import { CommentCard } from "./CommentCard"


export const CommentList = ({ article_id, comments, setComments, onUpdateComments }) => {

    useEffect(() => {
        fetchCommentsByArticleId(article_id).then((comments) => {
            setComments(comments)
        })
    }, [])

    return(
        <CommentCard comments={comments} onUpdateComments={onUpdateComments} article_id={article_id}/>
    )
}
