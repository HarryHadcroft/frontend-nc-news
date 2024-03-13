import { Link } from "react-router-dom";
import { UserContext } from "./contexts/User";
import { useContext, useEffect, useState } from "react";
import { fetchTopics } from "./api";

export const NavBar = () => {
  const { loggedInUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);
  console.log(topics);
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">NC News</Link>
        </h1>
        <ul className="nav-items">
          <li className="nav-item">
            <select name="" id="">
              <option value="">Topics</option>
              {topics.map((topic) => {
                return (
                  <option value={topic} key={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </li>
          <li className="nav-item">{loggedInUser.username}</li>
        </ul>
      </nav>
    </header>
  );
};
