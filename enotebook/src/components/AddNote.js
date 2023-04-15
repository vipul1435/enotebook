import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setnote] = useState({title:"",description:"",tag:"default"})


  const  handelClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""})
  }

  
  const onChangeValue = (e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (

    <>
        <h2>Add your notes</h2>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" value={note.title} id="title" onChange={onChangeValue} placeholder="Enter your title here"/>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" name='description' onChange={onChangeValue} value={note.description} id="description" rows="3" placeholder='Enter your descriptioin here'></textarea>
            <label htmlFor="tag" className="form-label mt-3">Tag</label>
            <textarea className="form-control" name='tag' id="tag" rows="1" value={note.tag} onChange={onChangeValue} placeholder='Enter your tag here'></textarea>
            <button disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-warning my-3" onClick={handelClick}>Add Note</button>
        </div> 
    </>
  )
}
