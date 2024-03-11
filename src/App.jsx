import './App.css'
import { Home } from './Home'
import { NavBar } from './NavBar'
import {Routes, Route} from "react-router-dom"
import { SingleArticle } from './SingleArticle'

function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/articles/:article_id" element={<SingleArticle />} />
    </Routes>
    </>
  )
}

export default App
