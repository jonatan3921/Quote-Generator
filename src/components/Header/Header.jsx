import React from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom'
import {BsChatSquareQuote} from 'react-icons/bs'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

function Header() {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)

    const handleLogout = () => {
      signOut(auth)
      navigate('/')
    }

  return (
    <div className='header-container'>
        <div className='logo-container' onClick={() => navigate('/')}>
          <div>
            <BsChatSquareQuote className='logo' />
            <h1>Quote Generator</h1>
          </div>
          <p>Get your quote of the day</p>
        </div>
        <nav>
            <Link className='btn btn-home' to='/'>Home</Link>
            <Link className='btn btn-note' to='/notes'>POST A NOTE!</Link>
            {
              user
              ? <div className='user-container'>
                {
                  user.displayName
                  ? <p>{user.displayName}</p>
                  : <p>{user.email}</p>
                }
                <button onClick={handleLogout}>Sign out</button>
              </div>
              : <Link className='btn btn-auth' to='/auth'>SIGN IN</Link>
            }
        </nav>
    </div>
  )
}

export default Header