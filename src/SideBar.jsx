import { useState, useEffect } from "react";
import { fetchTopics } from "./api";
import { Link } from "react-router-dom";

export const SideBar = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      fetchTopics().then((topics) => {
        setTopics(topics);
      });
    }, []);

    return (
        <div className="side-bar">
            <p className="topic-title">Topics</p>
            {topics.map((topic) => {
                return (
                    <Link to={`/${topic.slug}`} key={topic.slug} className="topic-text">
                        <p>{topic.slug}</p>
                    </Link>
                )
            })}
        </div>
    )
}