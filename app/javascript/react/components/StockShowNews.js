import React from "react"
import NewsArticle from "./NewsArticle"

const StockShowNews = props => {

  const { articles } = props

  if (articles) {
    const articlesList = articles.map(article => {
      return (
        <NewsArticle
          key={article.id}
          article={article}
        />
      )
    })
    return (
      <div className="articles">
        <h2 className="news-header">News Articles</h2>
        {articlesList}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default StockShowNews