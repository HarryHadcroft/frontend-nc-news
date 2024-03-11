import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <header>
      <nav>
        <h1>
            <Link to="/">NC News</Link></h1>
        <ul>
          <li>Topics</li>
          <li>jessjelly</li>
        </ul>
      </nav>
    </header>
  );
};
