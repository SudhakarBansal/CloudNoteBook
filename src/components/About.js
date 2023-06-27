import React,{useContext,useEffect} from 'react'
import NotesContext from '../context/notes/NotesContext'
const About = () => {
  const a = useContext(NotesContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      This is About {a.state.name} and class = {a.state.class}.
    </div>
  )
}

export default About
