import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
export default function Notes() {
    const context = useContext(noteContext);
    const {notes,fetchNotes} = context;
    useEffect(()=>{
      fetchNotes();
      // eslint-disable-next-line
    },[])
  return (
    <div className='row my-3'>
      <AddNote/>
        {
            notes.map((note)=>{
                return <Noteitem key = {note._id} note = {note}/>;
            })
        }
    </div>
  )
}
