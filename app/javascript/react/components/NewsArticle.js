import React from "react"
import { Redirect } from "react-router-dom"

const NewsArticle = props => {

  const { article } = props

  const formatDate = (d) => {
    const date = new Date(d)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const month = months[date.getMonth()]
    let dd = date.getDate()
    const yyyy = date.getFullYear()
    if (dd < 10) {dd = '0' + dd} 
    return month + ' ' + dd + ' ' + yyyy
  }

  let dotDotDot = ""
  if (article.description.length > 300) {
    dotDotDot = "..."
  }

  return (
    <div className="article-container">
      <div className="article-image-container">
        <a href={article.article_url} target="_blank">
          <img className="article-image" src={article.image_url} />
        </a>
      </div>
      <div className="article-details">
        <p className="article-source-time">{article.publisher.name} • {formatDate(article.published_utc)}</p>
        <a href={article.article_url} target="_blank">
          <h4 className="article-headline">{article.title}</h4>
        </a>
        <h5 className="article-description">{`${article.description.substring(0, 200)}${dotDotDot}`}</h5>
      </div>
    </div>
  )
}

export default NewsArticle