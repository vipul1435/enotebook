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

      const response = await fetch(`${host}/api/notes/addNotes`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTI0OTcyNTFmNDU1N2RmOGJiNDFlIn0sImlhdCI6MTY4MDQxNzk5Nn0.UF1pCiyVPPjWoUjiYJJZyklFDfSqfXp3g_xJ5jfXDS4"
        },
        body: JSON.stringify({title,description,tag})
      })
      console.log(response);
      // const note = {
      //   "_id": "6160b5sd058454a01d71",
      //   "user": "64292497251f4557df8bb41e",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2023-04-07T09:27:50.754Z",
      //   "__v": 0
      // }
      // console.log(notes[1]);
      // setNotes(notes.concat(note));
    }
    const [notes , setNotes] = useState([]);


    return (
        <NoteContext.Provider value={{notes,setNotes,deleteNote,fetchNotes, addNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 
export default NoteState;