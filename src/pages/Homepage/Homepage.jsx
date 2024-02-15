import React, {useState} from 'react'
import './Homepage.css'
import axios from 'axios';

function Homepage() {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  // Generate random number from 1-100 as the random page number for the API endpoint URl
  const randomNum = Math.floor((Math.random() * 100)+ 1);

  // Generate random number from 0 - 19 as the random index for the API data
  const randomIndex = Math.floor((Math.random() * 20));

  const getQuote = () => {
    // Make the Api request
    axios.get(`https://api.quotable.io/random`)
    .then(res => {
      console.log(res.data.content)
      setQuote(res.data.content)
      setAuthor(res.data.author)
    })
    .catch(err => console.log(err))
  }
 
  

  return (
    <div className='homepage-container'>
      <h2>PRESS and HOLD to generate a QUOTE</h2>
      <div className='quote-container'>
        <p className='quote'>"{quote}"</p>
        {
          quote && <p className='author'>-{author}</p>
        }
      </div>
        <button onClick={getQuote}>Generate</button>
    </div>
  )
}

export default Homepage