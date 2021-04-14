import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase"

const Chat = (props) => {

    const [user, setUser] = useState(auth().currentUser);
    const [chats, setChats] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);
    useEffect(async () => {
        setReadError(null);
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setChats(chats);
            });

        } catch (error) {
            setReadError(error.message);
        }
    }, []);

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWriteError(null);
        try {
            await db.ref("chats").push({
                content: content,
                timestamp: Date.now(),
                uid: user.uid
            });
            setContent('');
        } catch (error) {
            setWriteError(error.message);
        }
    }

    return (
        <div>
            <div className="chats">
                {chats.map(chat => {
                    return <p key={chat.timestamp}>{chat.content}</p>
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={content}></input>
                {writeError ? <p>{writeError}</p> : null}
                <button type="submit">Send</button>
            </form>
            <div>
                Login in as: <strong>{user.email}</strong>
            </div>
            <button type="button" onClick={props.logOut}>
                Log Out
            </button>
        </div>
    )
}

export default Chat;