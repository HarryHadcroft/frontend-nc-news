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

export const fetchCommentsByArticleId = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    })
}

export const updateArticleVotes = (article_id, votes) => {
    return newsApi.patch(`/articles/${article_id}`, votes).then((response) => {
        return response.data.updatedArticle
    })
}

export const postComment = (article_id, commentBody) => {
    return newsApi.post(`/articles/${article_id}/comments`, commentBody).then((response) => {
        return response.data
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`).then((response) => {
        return response.data
    })
}
