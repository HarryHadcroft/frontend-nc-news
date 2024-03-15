import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleVotes,
} from "./api";
import { CommentList } from "./CommentList";
import { CommentAdder } from "./CommentAdder";
import { ErrorPage } from "./ErrorPage";

export const SingleArticle = () => {
  const { article_id } = useParams();

  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoteError, setIsVoteError] = useState(false);
  const [isArticleError, setIsArticleError] = useState(false);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsArticleError(true);
      });
  }, []);

  const handleVote = (article_id, votes, increase) => {
    setSingleArticle((currSingleArticle) => {
      if (increase) {
        return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
      } else {
        return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
      }
    });

    updateArticleVotes(article_id, votes).catch((err) => {
      setIsVoteError(true);
      setSingleArticle((currSingleArticle) => {
        if (increase) {
          return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
        } else {
          return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
        }
      });
    });
  };

  const updateComments = () => {
    fetchCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
    });
  };

  if (isArticleError) {
    return <ErrorPage message={"This article does not exist!"} />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <section className="single-article-section">
        <div className="single-article-division">
          <h2>{singleArticle.title}</h2>
          <img src={singleArticle.article_img_url} alt="" />
        </div>
          <div className="single-article-interaction-card">
            <button
              className="vote-button"
              onClick={() => {
                handleVote(singleArticle.article_id, { inc_votes: 1 }, true);
              }}
            >
              <i className="bi bi-hand-thumbs-up"></i>
            </button>
            <p>{singleArticle.votes}</p>
            <button
              className="vote-button"
              onClick={() => {
                handleVote(singleArticle.article_id, { inc_votes: -1 }, false);
              }}
            >
              <i className="bi bi-hand-thumbs-down"></i>
            </button>
          </div>
        {isVoteError && <p>Vote failed!</p>}
        <CommentAdder
          singleArticle={singleArticle}
          onUpdateComments={updateComments}
        />
        <p className="comment-header">comments</p>
      <CommentList
        article_id={singleArticle.article_id}
        setComments={setComments}
        comments={comments}
        onUpdateComments={updateComments}
      />
      </section>
    </>
  );
};
