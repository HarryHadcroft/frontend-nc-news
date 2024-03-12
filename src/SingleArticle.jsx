import {useState, useEffect} from "react"
import { useParams } from "react-router";
import { fetchArticleById, updateArticleVotes } from "./api";
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

    const handleVote = (article_id, votes) => {
        updateArticleVotes(article_id, votes).then((article) => {
            setSingleArticle(article)
        })
    }
    console.log(singleArticle)
    
    return isLoading ? (
        <h1>Loading...</h1>
        ) : (
            <>
        <section>
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} alt="" />
            <div className="single-article-interaction-card">
                <p>Votes {singleArticle.votes}</p>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: 1})}}>Like</button>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: -1})}}>Dislike</button>
            </div>
            <p>comments</p>
        </section>
        <CommentList article_id={singleArticle.article_id}/>
        </>
    )
}