import React from "react"
import headshot from "../../../assets/images/Headshot.jpg"

export const About = (props) => {
  return (
    <div>
      <h1 className="about-header">About the Developer</h1>
      <div className="about-image-container">
        <img className="about-image" src={headshot} />
      </div>
      <h3 className="about-name">Jonathan Stern</h3>
      <h4 className="about-location">Boston, MA</h4>
      <p className="about-description">
        Prior to Launch Academy, I spent three years as an analyst at S&P
        Global, covering autonomous vehicles, connected cars, and the future of
        mobility. I knew I loved technology, and I appreciated the opportunity
        to cultivate a bird's-eye view of the market; however, this role at S&P
        led me to discover that my personality and ambitions are better suited
        to <i>building</i> new technologies, rather than writing about
        technology as an analyst. I want to be “in the arena,” which is why I
        enrolled at Launch and am so excited to begin my career a software
        developer!
      </p>
    </div>
  )
}

export default About
