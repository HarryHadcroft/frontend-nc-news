import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import { ArticleCard } from "./ArticleCard";
import "./App.css";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

export const ArticleList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [sortByIsOpen, setSortByIsOpen] = useState(false);
  const [orderByIsOpen, setOrderByIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  let sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");

  if(!sortBy){
    sortBy = "created_at"
  }

  const toggleSortByDropDown = () => {
    setOrderByIsOpen(false)
    setSortByIsOpen(!sortByIsOpen);
  };

  const toggleOrderByDropDown = () => {
    setSortByIsOpen(false)
    setOrderByIsOpen(!orderByIsOpen);
  };

  const closeSortBy = () => {
    setSortByIsOpen(false)
  }

  const closeOrderBy = () => {
    setOrderByIsOpen(false)
  }

  useEffect(() => {
    fetchArticles(topic, sortBy, order).then((articles) => {
      setIsErr(false)
      setArticles(articles);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err, "<<<<<")
      setIsLoading(false)
      setIsErr(true)
    })
  }, [topic, sortBy, order, isErr]);

  if (isLoading) {
    return <p>Loading page...</p>;
  }

  if(isErr){
    return(
      <ErrorPage message={`${topic} is not a valid topic!`} />
    )
  }
  return (
    <>
    <section className="sorting-section">
      <div className="sort-by-box">
        <button onClick={toggleSortByDropDown} className="sorting-button">
          sort by
        </button>
        {sortByIsOpen && (
          <div className="sort-by-options">
            <ul>
              <Link
                to={{
                  search: "?sort_by=created_at",
                }}
                onClick={closeSortBy}
              >
                <li>Date</li>
              </Link>
              <Link
                to={{
                  search: "?sort_by=votes",
                }}
                onClick={closeSortBy}
              >
                <li>Votes</li>
              </Link>
              <Link
                to={{
                  search: "?sort_by=comment_count",
                }}
                onClick={closeSortBy}
              >
                <li>Comments</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <div className="order-by-box">
        <button onClick={toggleOrderByDropDown} className="sorting-button">
          order by
        </button>
        {orderByIsOpen && (
          <div className="order-by-options">
            <ul>
              <Link
                to={{
                  search: `?sort_by=${sortBy}&order=DESC`,
                }}
                onClick={closeOrderBy}
              >
                <li>Descending</li>
              </Link>
              <Link
                to={{
                  search: `?sort_by=${sortBy}&order=ASC`,
                }}
                onClick={closeOrderBy}
              >
                <li>Ascending</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      </section>

      <ArticleCard articles={articles} />
    </>
  );
};
