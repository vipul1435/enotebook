import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setnote] = useState({title:"",description:"",tag:"default"})


  const  handelClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }

  
  const onChangeValue = (e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (

    <>
        <h2>Add your notes</h2>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" id="title" onChange={onChangeValue} placeholder="title"/>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" name='description' onChange={onChangeValue} id="description" rows="3" placeholder='Enter descriptioin here'></textarea>
            <label htmlFor="tag" className="form-label mt-3">Tag</label>
            <textarea className="form-control" name='tag' id="tag" rows="1" onChange={onChangeValue} placeholder='Enter tag here'></textarea>
            <button type="submit" className="btn btn-warning my-3" onClick={handelClick}>Add Note</button>
        </div> 
    </>
  )
}
