import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchArticleById, fetchCommentsByArticleId, updateArticleVotes } from "./api";
import { CommentList } from "./CommentList";
import { CommentAdder } from "./CommentAdder";

export const SingleArticle = () => {
    const { article_id } = useParams()
    
    const [singleArticle, setSingleArticle] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        fetchArticleById(article_id).then((article) => {
            setSingleArticle(article)
            setIsLoading(false)
        })
    }, [])

    const handleVote = (article_id, votes, increase) => {
        setSingleArticle((currSingleArticle) => {
            if(increase){
                return {...currSingleArticle, votes: currSingleArticle.votes + 1}
            }else{
                return {...currSingleArticle, votes: currSingleArticle.votes - 1}
            }
            
        })

        updateArticleVotes(article_id, votes).catch((err) => {
            setIsError(true)
            setSingleArticle((currSingleArticle) => {
                if(increase){
                    return {...currSingleArticle, votes: currSingleArticle.votes - 1}
                }else{
                    return {...currSingleArticle, votes: currSingleArticle.votes + 1}
                }
            })
        })
    }

    const updateComments = () => {
        fetchCommentsByArticleId(article_id).then((comments) => {
            setComments(comments)
        })
    }
        
    if(isError){
        return(
            <>
            <section>
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} alt="" />
            <div className="single-article-interaction-card">
                <p>Votes {singleArticle.votes}</p>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: 1}, true)}}>Like</button>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: -1}, false)}}>Dislike</button>
            </div>
            <p>comments</p>
        </section>
        <p>Vote failed!</p>
        </>
        )
    }
    
    return isLoading ? (
        <h1>Loading...</h1>
        ) : (
            <>
        <section className="single-article-section">
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} alt="" />
            <div className="single-article-interaction-card">
                <p>Votes {singleArticle.votes}</p>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: 1}, true)}}>Like</button>
                <button className="vote-button" onClick={() => {handleVote(singleArticle.article_id, {inc_votes: -1}, false)}}>Dislike</button>
            </div>
            <CommentAdder singleArticle={singleArticle} onUpdateComments={updateComments}/>
            <p>comments</p>
        </section>
        <CommentList article_id={singleArticle.article_id} setComments={setComments} comments={comments} onUpdateComments={updateComments}/>
        </>
    )
}