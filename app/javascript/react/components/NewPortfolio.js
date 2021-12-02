import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { generateSlug } from "random-word-slugs"
import reloadIcon from "../../../assets/images/reload.jpg"

let slug = `${generateSlug(2, { format: "title" })}'s Portfolio`

const NewPortfolio = () => {

  const [portfolioName, setPortfolioName] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState({ status: false, id: null })
  const [randomWords, setRandomWords] = useState(slug)
  const [errors, setErrors] = useState("")

  const getNewRandomWord = () => {
    slug = `${generateSlug(2, { format: "title" })}'s Portfolio`
    setRandomWords(slug)
  }

  const handleInputChange = event => {
    setPortfolioName(event.currentTarget.value)
    setErrors("")
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/portfolios`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(portfolioName)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setShouldRedirect({status: true, id: responseBody.id})
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      if (portfolioName === "") {
        setErrors("You must enter a portfolio name")
      }
    }
  }
   
  if (shouldRedirect.status) {
    return <Redirect push to={`/portfolios/${shouldRedirect.id}`} />
  }

  const clickRandomWords = () => {
    return setPortfolioName(slug)
  }
  
  return (
    <div className="new-portfolio-page">
      <div className="header">
        Create a new portfolio
      </div>
      <div className="description">
        Once you create a new portfolio, you will be able to add stocks and track their performance
      </div>
      <div className="new-portfolio-container" onSubmit={onSubmitHandler}>
        <div className="errors">
          {errors}
        </div>
        <form className="new-portfolio-form">
          <label className="form-label" htmlFor="name">
            Portfolio name:
          </label>
          <input autoComplete="off" id="new-portfolio-input" className="input" type="text" name="name" onChange={handleInputChange} value={portfolioName} />
          <p className="form-subtext first">Great portfolio names are short and memorable. Need inspiration? How about <b className="random-words" onClick={clickRandomWords}>{slug}</b>?</p>
          <p className="form-subtext second">Want another suggestion? <img className="random-words" height="18px" width="18px" onClick={getNewRandomWord} src={reloadIcon} /></p>
          <input className="button" type="submit" value="Create portfolio" />
        </form>
      </div>
    </div>
  )
}

export default NewPortfolio