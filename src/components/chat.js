import {useEffect, useState} from "react"
//firestore imports
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { auth, database } from "../firebase-config";

//import style
import "../styles/chat.css"

export const Chat = (props) => {

    //stores the room the user created in App.js
    const room = props.room;

    const name = props.userChatName;

    //make a reference to the collection we want to add docs to
    const messagesColl = collection(database, "messages");

    //state to keep track of what the user is typing in the input
    const [message, setMessage] = useState("");

    //state to display ALL messages inside a room as an ARRAY
    const [allMessages, setAllMessages] = useState([]);

    //allows us to fetch all the data and display it in the chatroom
    useEffect(() => {
        //query allows you to filter out the data in your collection 
        //where allows you to identify docs that meet your criteria
        //we only want to fetch data/messages from the SAME ROOM 
        //messages are ordered in ascending order
        const messagesQuery = query(messagesColl, 
            where("room", "==", room), orderBy("createdAt"));

        //allows us to listen for changes to the collection
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        //declare empty array
        let updatedMessages = [];

        //grab every element in the snapshot  + add each doc
        //as an object to the array "updatedMessages" 
        snapshot.forEach((doc) => {
            //add all of the data from doc & create a new field called 
            //"id" and store the doc.id as its value
            updatedMessages.push({...doc.data(), id : doc.id});
            });
        
        //update the message stream 
        setAllMessages(updatedMessages);
        });

        //clean up our useEffect
        return () => unsubscribe();

    }, []);

    //submit form event handler
    const handleSubmit = async (e) => {
        //prevents the page from reloading
        e.preventDefault()

        //test message in the console
        console.log(message);

        //if the message is empty, return nothing (DON'T ADD TO DATABASE)
        if (message === "") {
            return;
        }

        //add doc/message to your collection with 2 arguments:
        //(1) reference to your collection
        //(2) the object to add as your doc {attr1: something, attr2: something...}
        await addDoc(messagesColl, {
            text: message,
            //serverTimestamp returns the time the message was sent
            createdAt: serverTimestamp(),
            name: name + " meow",
            room: room,
        });

        //clear message after adding new doc
        setMessage("");

    }

    return (

        <div className="chat-app"> 

        <div className="header"> 
        <h1> Welcome to: {room} </h1>
        </div>

        <div className="messages"> 
        
        {allMessages.map((m) => 
            <div className="message" key={m.id}> 
                <span className="user"> {m.name} </span>
                {m.text}
            </div> 

        )} </div>
        
        <form onSubmit={handleSubmit} className="new-message-form">

            {/** onChange will continue to update the "message" state with the input text */}
            {/** set value to message so that when message cleared so does the input */}
            <input className="new-message-input" placeholder="type something..." onChange={(e) => setMessage(e.target.value)} value={message}/>

            {/** button must be of type "submit" for it to submit the form */}
            <button type="submit" className="send-button"> Send </button>
    
        </form>
       
        </div>
    )
}
