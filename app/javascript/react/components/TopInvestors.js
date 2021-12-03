import React from "react"
import TopInvestor from "./TopInvestor"
import Buffett from "../../../assets/images/Buffett.jpg"
import Soros from "../../../assets/images/Soros.jpg"
import Jones from "../../../assets/images/Jones.jpg"
import Druckenmiller from "../../../assets/images/Druckenmiller.jpg"
import Marks from "../../../assets/images/Marks.jpg"
import Cohen from "../../../assets/images/Cohen.jpg"

export const TopInvestors = (props) => {
  
  return (
    <div className="top-investors">
      <h2 className="top-investors-text">Compare your portfolio with the best in the world</h2>
      <TopInvestor
        key="1"
        id="1"
        name="Warren Buffett"
        fund="Berkshire Hathaway"
        photo_url={Buffett}
      />
      <TopInvestor
        key="2"
        id="2"
        name="George Soros"
        fund="Soros Fund Management"
        photo_url={Soros}
      />
      <TopInvestor
        key="3"
        id="3"
        name="Paul Tudor Jones"
        fund="Tudor Investment Corporation"
        photo_url={Jones}
      />
      <TopInvestor
        key="4"
        id="4"
        name="Steve Cohen"
        fund="Point72"
        photo_url={Cohen}
      />
      <TopInvestor
        key="5"
        id="5"
        name="Stanley Druckenmiller"
        fund="Duquesne Family Office"
        photo_url={Druckenmiller}
      />
      <TopInvestor
        key="6"
        id="6"
        name="Howard Marks"
        fund="Oaktree Capital"
        photo_url={Marks}
      />
    </div>
  )
}

export default TopInvestors