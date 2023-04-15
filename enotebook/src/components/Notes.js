import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
export default function Notes() {
    const navigate = useNavigate(); 
    const context = useContext(noteContext);
    const {notes,fetchNotes,editNote} = context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        fetchNotes();
      } else {
        navigate('/login');
      }
      // eslint-disable-next-line
    },[])
    const ref = useRef(null)
    const ref_success = useRef(null)
    const [update_note, set_update_note] = useState({id:"",up_title:"",up_description:"",up_tag:""})
    const updateNote = (note) =>{
      ref.current.click();
      set_update_note({id:note._id,up_title:note.title,up_description:note.description,up_tag:note.tag});
    }

    const onChange = (e) =>{
      set_update_note({...update_note , [e.target.name]: e.target.value})
    }

    const onClick = (e) =>{
      e.preventDefault();
      editNote(update_note.id,update_note.up_title,update_note.up_description,update_note.up_tag);
      ref_success.current.click();
    }
  return (
    <div className='row my-3'>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update your note</h1>
              </div>
              <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="up_title" className="form-label">Title</label>
                    <input type="text" name='up_title' value={update_note.up_title} className="form-control" id="up_title" onChange={onChange} placeholder="title"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="up_description" className="form-label">Description</label>
                    <textarea className="form-control" value={update_note.up_description} name='up_description' onChange={onChange} id="up_description" rows="3" placeholder='Enter descriptioin here'></textarea>
                    <label htmlFor="up_tag" className="form-label mt-3">Tag</label>
                    <textarea className="form-control" name='up_tag' value={update_note.up_tag} id="up_tag" rows="1" onChange={onChange} placeholder='Enter tag here'></textarea>
                 </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={ref_success} data-bs-dismiss="modal">Close</button>
                <button disabled = {update_note.up_title.length<5 || update_note.up_description.length<5} type="button" className="btn btn-primary"  onClick={onClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      <AddNote/>
        {
            notes.map((note)=>{
                return <Noteitem key = {note._id} note = {note} updateNote={updateNote}/>;
            })
        }
    </div>
  )
}
