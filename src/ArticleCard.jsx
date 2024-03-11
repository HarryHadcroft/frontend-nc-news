export const ArticleCard = ({ articles }) => {
return(
    <section className="section-container">
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-card">
            <p>{article.title}</p>
            <img src={article.article_img_url} alt="" className="article-img" />
            <p>Votes {article.votes}</p>
            <p>comments {article.comment_count}</p>
          </div>
        );
      })}
    </section>
)
}