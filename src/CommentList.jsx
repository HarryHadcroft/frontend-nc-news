import { useEffect, useState } from "react"
import { fetchCommentsByArticleId } from "./api"
import { CommentCard } from "./CommentCard"


export const CommentList = ({ article_id }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchCommentsByArticleId(article_id).then((comments) => {
            setComments(comments)
        })
    }, [])

    return(
        <CommentCard comments={comments}/>
    )
}