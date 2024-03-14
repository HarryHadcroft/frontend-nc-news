import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import { ArticleCard } from "./ArticleCard";
import "./App.css";
import { useParams } from "react-router";

export const ArticleList = () => {
  const { topic } = useParams()
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(topic).then((articles) => {
      setArticles(articles);
    });
  }, [topic]);

  return (
    <ArticleCard articles={articles}/>
  );
};
