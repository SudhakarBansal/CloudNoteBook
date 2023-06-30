import NotesContext from "./NotesContext";
import { useState } from "react";
const NotesState = (props) => {
  const notesInitial = [
    {
      "_id": "648800bdc9e5a5329e43b8fc",
      "user": "6486a938f6b9c91728b68a73",
      "title": "My Title",
      "description": "This is a description block",
      "tag": "personal",
      "date": "2023-06-13T05:38:05.713Z",
      "__v": 0
    },
    {
      "_id": "648800bdc9e5a5329e43b9fc",
      "user": "6486a938f6b9c91728b68a73",
      "title": "Title",
      "description": "This is a description 2 block",
      "tag": "personal",
      "date": "2023-06-13T05:38:05.713Z",
      "__v": 0
    }
  ]
  const [notes, setnotes] = useState(notesInitial);

  //Adding Note
  const addNote = (title, description, tag) => {
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
  const editNote = (id, title, description, tag) => {

  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NotesContext.Provider>
  )
}
export default NotesState;
