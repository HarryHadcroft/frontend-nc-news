import {useState, useEffect} from "react"
import { useParams } from "react-router";
import { fetchArticleById } from "./api";
import { CommentList } from "./CommentList";

export const SingleArticle = () => {
    const { article_id } = useParams()
    
    const [singleArticle, setSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticleById(article_id).then((article) => {
            setSingleArticle(article)
            setIsLoading(false)
        })
    }, [])

    
    return isLoading ? (
        <h1>Loading...</h1>
        ) : (
            <>
        <section>
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} alt="" />
            <p>Votes {singleArticle.votes}</p>
            <p>comments {singleArticle.comment_count}</p>
        </section>
        <CommentList article_id={singleArticle.article_id}/>
        </>
    )
}