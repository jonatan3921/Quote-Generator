import React, {useState, useEffect} from 'react'
import './Notes.css'
import { db } from '../../config/firebaseConfig'
import { collection, getDocs, addDoc, query, onSnapshot, where, deleteDoc, doc } from 'firebase/firestore'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

function Notes() {
    const [note, setNote] = useState('')
    const [userStickers, setUserStickers] = useState([])
    const [sticker, setSticker] = useState([])

    const navigate = useNavigate()
    const [user] = useAuthState(auth)


    if (user) {
        useEffect(
            () => {
                // Get the reference of the collection
                const notesRef = collection(db, 'userNotes')
    
                // Filter to show stickers from the user
                const q = query(notesRef, where('userId', '==', user?.uid))
    
                onSnapshot(q, (snapshot) => {
                    // Convert to array
                    const notes = snapshot.docs.map(item => ({
                        ...item.data(),
                        id: item?.id
                    }))
                    setUserStickers(notes)
                })
            }, []
        )
    }

    const addNote = (e) => {
        e.preventDefault()

        if (user){
            if(note === '') {
                alert('text cannot be blank, please write a message before submitting')
            } else {
                // Reference to the collection
                const notesRef = collection(db, 'userNotes')
    
                // Use addDoc to add the note to the collection
                addDoc(notesRef, {
                    content: note,
                    userId: user?.uid
                })
                .then(res => {
                    setNote('')
                })
                .catch(err => console.log(err))
            }
        } else {
            if(note === '') {
                alert('text cannot be blank, pleaser write a message before submitting.')
            } else {
                setSticker([...sticker, note])
                setTimeout(() => {
                    setNote('')
                }, 1000)
            }
        }
    }


    const clearNotes = (e) => {
        e.preventDefault()

        setSticker([])
    }

    const removeNote = (id) => {
        //We need the id of the sticker to delete it
        deleteDoc(doc(db, 'userNotes', id))
        .then(res => {
            navigate('/notes')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='notes-container'>
        <div className='notes-header'>
            <h1>Post a Note</h1>
            <p>You can post a personal note by filling up the form below and clicking "Submit".</p>
            <p>You can clear your sticky notes by clicking on the "Clear" button.</p>
        </div>
        <input type='text' className='user-input' onChange={(e) => setNote(e.target.value)} value={note}/>
        <div className='button-container'>
            {
                user 
                ? null
                : <button onClick={clearNotes}>Clear</button>
            }
            <button onClick={addNote} className={user ? 'addNote-btn' : null}>Submit</button>
        </div>
        <div className='stickers-container'>
            {
              user 
              ? userStickers.map(item =>
                <div key={item?.id}>
                    <p>{item?.content}</p>
                    <button onClick={() => removeNote(item?.id)}>Remove</button>
                </div>)
              : sticker.map(item => 
                <div>
                    <p>{item}</p>
                </div>)
            }
        </div>
    </div>
  )
}

export default Notes