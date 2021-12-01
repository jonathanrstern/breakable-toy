import React from "react"
import { Link } from "react-router-dom"
import FetchFromAPI from "./FetchFromAPI"
import NavBar from "./NavBar"
import SearchBar from "./SearchBar"
import TopInvestor from "./TopInvestor"

const Index = () => {

  return (
    <div className="landing-page-container">
      <h1 className="landing-page-text">Keep track of your portfolio</h1>
      <h3 className="landing-page-subtext">
        Real time quotes, the latest news, and comparisons with the top investors in the world
      </h3>
      <Link to="/portfolios/new">
        <button className="landing-page-cta">
          Create a portfolio
        </button>
      </Link>
      <div className="top-investors">
        <TopInvestor
          key="1"
          name="Warren Buffett"
          photo_url="https://247wallst.com/wp-content/uploads/2016/05/warren-buffett-square-e1462828190521.jpg"
          fund_logo_url=""
        />
        <TopInvestor
          key="2"
          name="George Soros"
          photo_url="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4e72bdd82a882a3012a595%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D886%26cropX2%3D3035%26cropY1%3D515%26cropY2%3D2664"
          fund_logo_url=""
        />
        <TopInvestor
          key="3"
          name="Paul Tudor Jones"
          photo_url="https://pyxis.nymag.com/v1/imgs/08d/0d5/d9850c041c068071606264591806025590-23-paul-tudor-jones.rsquare.w330.jpg"
          fund_logo_url=""
        />
        <TopInvestor
          key="4"
          name="Steve Cohen"
          photo_url="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5a8d946e4bbe6f2652f61ca6%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D703%26cropX2%3D3292%26cropY1%3D80%26cropY2%3D2667"
          fund_logo_url=""
        />
        <TopInvestor
          key="5"
          name="Stanley Druckenmiller"
          photo_url="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d8a9ea218444200084e6e8b%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1229%26cropX2%3D3892%26cropY1%3D6%26cropY2%3D2667"
          fund_logo_url=""
        />
        <TopInvestor
          key="6"
          name="Howard Marks"
          photo_url="https://global-uploads.webflow.com/5dfd5aca7badfa129f80056c/5efe3aafb172da35f0e74c99_howard-marks.jpeg"
          fund_logo_url=""
        />
      </div>
    </div>
  )
}

export default Index