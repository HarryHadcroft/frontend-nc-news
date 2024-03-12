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
        <ul>
          <li>Topics</li>
          <li>{loggedInUser.username}</li>
        </ul>
      </nav>
    </header>
  );
};
