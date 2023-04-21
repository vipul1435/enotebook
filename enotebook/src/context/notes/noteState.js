import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    
    const fetchNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchNotes`,{
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      const json =await response.json();
      setNotes(json);
    }
    const deleteNote = async (id) =>{
       await fetch(`${host}/api/notes/deleteNotes/${id}`,{
        method : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      showAlert("Note has been deleted","success");
      const newItem = notes.filter((note)=>{ return note._id!==id})
      setNotes(newItem);
    }
    
    const addNote =async (title ,description , tag) =>{

      const response =  await fetch(`${host}/api/notes/addNotes`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      })
      showAlert("Note has been Added","success");
      const note = await response.json();
      setNotes(notes.concat(note));
    }

    const editNote = async(id,title,description,tag) =>{    
      await fetch(`${host}/api/notes/updateNotes/${id}`,{
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      })
      let newnote = JSON.parse(JSON.stringify(notes));
      for(let i=0;i<newnote.length; i++ ){
        if(newnote[i]._id===id){
          newnote[i].title = title;
          newnote[i].description = description;
          newnote[i].tag= tag;
          break;
        }
      }
      showAlert("Note has been Updated","success");
      setNotes(newnote);
    }
    const [alert, setAlert] = useState(null);

    const showAlert = (msg, type) => {
      setAlert({
        message: msg,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    };
    const [notes , setNotes] = useState([]);
    return (
        <NoteContext.Provider value={{notes,setNotes,deleteNote,fetchNotes,addNote,editNote,alert,showAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 
export default NoteState;