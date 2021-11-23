import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"



const NewPortfolio = () => {

  const [portfolioName, setPortfolioName] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState({ status: false, id: null })

  const handleInputChange = event => {
    setPortfolioName(event.currentTarget.value)
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
      const responseBody = await response.json()
      setShouldRedirect({status: true, id: responseBody.id})
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
    // clearForm() 
  }
   
  if (shouldRedirect.status) {
    return <Redirect push to={`/portfolios/${shouldRedirect.id}`} />
  }
  
  return (
    <div className="new-portfolio-container" onSubmit={onSubmitHandler}>
      <form className="new-portfolio-form">
        <label className="form-label" htmlFor="name">
          Choose a name for your portfolio:
        </label>
          <input className="input" type="text" name="name" onChange={handleInputChange} value={portfolioName} />

        <input className="button" type="submit" value="Next" />
      </form>
    </div>
  )
}

export default NewPortfolio