import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, setnotes } = context;
    return (
        <div className='row my-3'>
            <h2>
                Your notes.
            </h2>
            {notes.map((note) => {
                return <Noteitem note={note} key={note._id} />;
            })
            }
        </div>
    )
}

export default Notes
