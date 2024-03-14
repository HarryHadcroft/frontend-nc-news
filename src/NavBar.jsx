import { Link } from "react-router-dom";
import { UserContext } from "./contexts/User";
import { useContext, useEffect, useState } from "react";
import { fetchTopics } from "./api";

export const NavBar = () => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <header>
      <nav>
        <h1>
          <Link to="/" className="nav-title">NC News</Link>
        </h1>
        <ul className="nav-items">
          <li className="nav-item">{loggedInUser.username}</li>
        </ul>
      </nav>
    </header>
  );
};
