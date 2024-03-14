import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import { ArticleCard } from "./ArticleCard";
import "./App.css";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";

export const ArticleList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get("sort_by")
  const order = searchParams.get("order")

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchArticles(topic, sortBy, order).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic, sortBy, order]);

  if (isLoading) {
    return <p>Loading page...</p>;
  }
  return (
    <>
      <div className="sort-by-box">
        <button onClick={toggleDropDown}>sort by</button>
        {isOpen && (
          <div className="sort-by-options">
            <ul>
              <Link
                to={{
                  search: "?sort_by=created_at",
                }}
              >
                <li>Date</li>
              </Link>
              <Link
                to={{
                  search: "?sort_by=votes",
                }}
              >
                <li>Votes</li>
              </Link>
              <Link
                to={{
                  search: "?sort_by=comment_count",
                }}
              >
                <li>Comments</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <ArticleCard articles={articles} />
    </>
  );
};
