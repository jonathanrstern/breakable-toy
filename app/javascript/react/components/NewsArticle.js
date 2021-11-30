import React from "react"
import { Redirect } from "react-router-dom"

const NewsArticle = props => {

  const { article } = props

  const formatDate = (d) => {
    const date = new Date(d)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const month = months[date.getMonth()]
    const dd = date.getDate()
    const yyyy = date.getFullYear()
    if(dd < 10) {dd='0'+dd} 
    return month + ' ' + dd + ' ' + yyyy
  }

  const timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const time = month + ' ' + date + ' ' + year
    return time
  }

  return (
    <div className="article-container">
      <img className="article-image" src={article.image_url} />
      <div className="article-details">
        <p className="article-source-time">{article.publisher.name} • {formatDate(article.published_utc)}</p>
        <a href={article.article_url} target="_blank">
          <h4 className="article-headline">{article.title}</h4>
        </a>
        <h5 className="article-description">{article.description}</h5>
      </div>
    </div>
  )
}

export default NewsArticle