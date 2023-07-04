import NotesContext from "./NotesContext";
import { useState } from "react";
const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

  //get all Notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NmE5MzhmNmI5YzkxNzI4YjY4YTczIn0sImlhdCI6MTY4NjYyOTc2NX0.8Gih8ryX-ZqZ-GTAbGHd-hvsJalMcfjHHYwEGoGzgAM"
      },
    });
    const json = await response.json();
    setnotes(json);
  }

  //Adding Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NmE5MzhmNmI5YzkxNzI4YjY4YTczIn0sImlhdCI6MTY4NjYyOTc2NX0.8Gih8ryX-ZqZ-GTAbGHd-hvsJalMcfjHHYwEGoGzgAM"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setnotes(notes.concat(note));
  }


  //Deleting Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NmE5MzhmNmI5YzkxNzI4YjY4YTczIn0sImlhdCI6MTY4NjYyOTc2NX0.8Gih8ryX-ZqZ-GTAbGHd-hvsJalMcfjHHYwEGoGzgAM"
      },
    });
    const json = await response.json();
    const newNote = notes.filter((note) => { return (note._id !== id) })
    setnotes(newNote);
  }

  //editing Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NmE5MzhmNmI5YzkxNzI4YjY4YTczIn0sImlhdCI6MTY4NjYyOTc2NX0.8Gih8ryX-ZqZ-GTAbGHd-hvsJalMcfjHHYwEGoGzgAM"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}
export default NotesState;
