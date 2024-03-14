import "./App.css";
import { ArticleList } from "./ArticleList";
import { NavBar } from "./NavBar";
import { Routes, Route } from "react-router-dom";
import { SingleArticle } from "./SingleArticle";
import { UserContext } from "./contexts/User";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { ErrorPage } from "./ErrorPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "jessjelly",
  });

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <NavBar />
      <div className="app-container">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="*" element={<ErrorPage message={"Page does not exist!"}/>} />
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/:topic" element={<ArticleList />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
