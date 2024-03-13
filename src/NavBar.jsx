import { Link } from "react-router-dom"
import { UserContext } from "./contexts/User";
import { useContext } from "react";

export const NavBar = () => {
  const { loggedInUser } = useContext(UserContext)
  return (
    <header>
      <nav>
        <h1>
            <Link to="/">NC News</Link></h1>
        <ul className="nav-items">
          <li className="nav-item">Topics</li>
          <li className="nav-item">{loggedInUser.username}</li>
        </ul>
      </nav>
    </header>
  );
};
