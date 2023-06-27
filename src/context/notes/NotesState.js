import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const s1 = {
        "name": "sudhakar",
        "class": "BCA-3"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "Sidh",
                "class": "BCA-5th"
            })
        }, 1000);
    }
    return (
        <NotesContext.Provider value= {{state, update}}>
            {props.children}
        </NotesContext.Provider>
    )
}
export default NotesState;
