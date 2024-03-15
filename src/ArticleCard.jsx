import { Link } from "react-router-dom";

export const ArticleCard = ({ articles }) => {
  return (
    <section className="article-container">
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-card">
            <Link to={`/articles/${article.article_id}`} className="article-card-link">
              <p className="article-card-title">{article.title}</p>
              <img
                src={article.article_img_url}
                alt=""
                className="article-img"
              />
            </Link>
            <div className="article-card-comments-votes">
                <p>{article.votes} <i class="bi bi-arrow-up-circle"></i></p>
                <p>{article.comment_count} <i class="bi bi-chat-left"></i> </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
