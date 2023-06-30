import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesState from './context/notes/NotesState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NotesState>
        <BrowserRouter>
          <Navbar />
          <Alert message = "this is a good thing"/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NotesState>
    </>
  );
}

export default App;