import React from 'react'
import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";




function Footer() {
  return (
    <div className='footer-container'>
      <p>Find me on Social Media</p>
      <div className='social-links'>
        <a href=""><FaInstagram /></a>
        <a href=""><FaFacebookSquare /></a>
        <a href=""><FaGithub /></a>
      </div>
    </div>
  )
}

export default Footer