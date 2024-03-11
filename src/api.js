import axios from "axios"

const newsApi = axios.create({
    baseURL: "https://nc-news-yxr5.onrender.com/api"
})

export const fetchArticles = () => {
    return newsApi.get("/articles").then((response) => {
        return response.data.articles
    })
}

export const fetchArticleById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    })
}