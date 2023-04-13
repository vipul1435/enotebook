import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {
    const a = useContext(noteContext);
  return (
    <div>
        <h1>this is {a.name} {a.class}</h1>
    </div>
  )
}
