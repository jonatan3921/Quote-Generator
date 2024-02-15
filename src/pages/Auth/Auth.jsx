import React, { useState } from 'react'
import './Auth.css'
import { auth } from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const navigate = useNavigate()
    const [existingUser, setExistingUser] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            // Add the username as displayName
            updateProfile(auth.currentUser, {displayName: name})

            navigate('/')
        })
        .catch(err => console.log(err))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        // Login
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            navigate('/')
        })
        .catch(err => {
            alert('We are sorry, but You cannot login at this moment.')
        })
    }

  return (
    <div className='auth-page'>
        {
            existingUser ? (
                <form className='auth-container' onSubmit={handleLogin}>
                    <h1>Log In</h1>
                    <h3>Welcome back!</h3>

                    <input type="email" placeholder='Enter your Email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

                    <input type="password" placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)} value={password}/>

                    <button>Log in</button>
                    <p>Don't have an account? <br/> <span onClick={() => setExistingUser(!existingUser)}>Sign up</span></p>
                </form>
            )
            : (
                <form className='auth-container' onSubmit={handleSignup}>
                    <h1>Sign up</h1>
                    <h3>Save your favorite quotes!</h3>

                    <input type="text" placeholder='Enter your Username' required onChange={(e) => setName(e.target.value)} value={name}/>

                    <input type="email" placeholder='Enter your Email' required onChange={(e) => setEmail(e.target.value)} value={email} />

                    <input type="password" placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)} value={password} />

                    <button>Sign up</button>
                    <p>Already have an account? <span onClick={() => setExistingUser(!existingUser)}>Log in</span></p>
                </form>
            )
        }
    </div>
  )
}

export default Auth