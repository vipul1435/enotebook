import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    
    const fetchNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchNotes`,{
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTI0OTcyNTFmNDU1N2RmOGJiNDFlIn0sImlhdCI6MTY4MDQxNzk5Nn0.UF1pCiyVPPjWoUjiYJJZyklFDfSqfXp3g_xJ5jfXDS4"
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
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTI0OTcyNTFmNDU1N2RmOGJiNDFlIn0sImlhdCI6MTY4MDQxNzk5Nn0.UF1pCiyVPPjWoUjiYJJZyklFDfSqfXp3g_xJ5jfXDS4"
        }
      })
      const newItem = notes.filter((note)=>{ return note._id!==id})
      setNotes(newItem);
    }
    
    const addNote =async (title ,description , tag) =>{

      const response =  await fetch(`${host}/api/notes/addNotes`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTI0OTcyNTFmNDU1N2RmOGJiNDFlIn0sImlhdCI6MTY4MDQxNzk5Nn0.UF1pCiyVPPjWoUjiYJJZyklFDfSqfXp3g_xJ5jfXDS4"
        },
        body: JSON.stringify({title,description,tag})
      })
      const note = await response.json();
      setNotes(notes.concat(note));
    }

    const editNote = async(id,title,description,tag) =>{    
      await fetch(`${host}/api/notes/updateNotes/${id}`,{
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTI0OTcyNTFmNDU1N2RmOGJiNDFlIn0sImlhdCI6MTY4MDQxNzk5Nn0.UF1pCiyVPPjWoUjiYJJZyklFDfSqfXp3g_xJ5jfXDS4"
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
      setNotes(newnote);
    }
    const [notes , setNotes] = useState([]);
    return (
        <NoteContext.Provider value={{notes,setNotes,deleteNote,fetchNotes, addNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 
export default NoteState;