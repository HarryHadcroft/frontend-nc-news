import './App.css'
import { Home } from './Home'
import { NavBar } from './NavBar'
import {Routes, Route} from "react-router-dom"
import { SingleArticle } from './SingleArticle'
import { CommentAdder } from './CommentAdder'
import { UserContext } from './contexts/User'
import { useState } from 'react'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    username: "jessjelly"
  })

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
