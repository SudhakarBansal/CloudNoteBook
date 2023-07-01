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

    const note = {
      "_id": "648800bdc9e5a5329e43b9fc",
      "user": "6486a938f6b9c91728b68a73",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-13T05:38:05.713Z",
      "__v": 0
    }
    setnotes(notes.concat(note));
  }


  //Deleting Note
  const deleteNote = (id) => {
    const newNote = notes.filter((note) => { return (note._id !== id) })
    setnotes(newNote);
  }

  //editing Note
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NmE5MzhmNmI5YzkxNzI4YjY4YTczIn0sImlhdCI6MTY4NjYyOTc2NX0.8Gih8ryX-ZqZ-GTAbGHd-hvsJalMcfjHHYwEGoGzgAM"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //Logic for editing a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}
export default NotesState;
