import { useState, useRef} from 'react';
// import './index.css';
import {Auth} from './components/Auth'
//imports for our cookies
import Cookies from 'universal-cookie';
import { Chat } from './components/chat';
import {signOut} from "firebase/auth"
import {auth} from './firebase-config'
import './App.css';
import catImage from './images/catimg.png';

const cookies = new Cookies();

function App() {

  //will constantly check T/F whether the user is authenticated or not when app is running
  //must check the refresh token that was stored inside Auth.js using the cookies's getter under the name "auth-token"
  //initial authentication value will be set to the auth-token; null if never authenticated
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  //state that keeps track of our chatroom
  const [room, setRoom] = useState(null);

  //state that keeps track of user chat name
  const [userChatName, setUserChatName] = useState("");

  //used to hold a reference to the user input
  const roomInputRef = useRef(null);

  const chatNameRef = useRef(null);

  //function to sign user out of their google account
  const signUserOut =  async () => {
    await signOut(auth);
    //remove the cookies from the browser with login info
    cookies.remove("auth-token");
    //set authentication back to false
    setIsAuth(false);
    //disable the room to null
    setRoom(null);
  }

  // updates the states for both room name and user's chat name
  const setRoomAndName = (roomName, chatName) => {
    setRoom(roomName);
    setUserChatName(chatName);
  }


  //if the user is not authenticated, show them the login page.
  //Else, navigate to the chat room
  if (!isAuth) {

    return (
      <div className="App">
        <div className="app-header"> 
            <h1> Welcome to Meow Chat Room </h1>
        </div>
        <img className="app-img" src={catImage} alt="Image of a cat"/>
        {/** NAVIGATE TO LOGIN PAGE */}
        {/** pass in auth state to be changed when user authenticates*/}
        <Auth setIsAuth = {setIsAuth}/>
      </div>
    );
  } 

  //if user is authenticated...
  //if room exist --> go to the chat room 
  //if room does NOT exist --> create chat room with user inputs
  
  return (
  <> 
    {
    //check room and set to a room
    room ? 
      // ROOM EXIST! --> open Chat component
    (<div> <Chat room={room} userChatName={userChatName}/> </div>) : 

    //  ROOM DOES NOT EXIST
    (
    <div className="room"> 
    <label> Enter Your Chat Name: </label>
    <input ref={chatNameRef}/>
    {/* <button onClick={() => setUserChatName(chatNameRef.current.value)}> create chat name </button> */}

    <label> Enter Room Name: </label>
      {/** grabs the input and stores it inside roomInputRef*/}
    <input ref={roomInputRef}/>

      {/** room state will be set to the value of roomInputRef AKA chat name set by users */}
    <button onClick={() => setRoomAndName(roomInputRef.current.value, chatNameRef.current.value)}> Enter Chat</button>
    </div>
    
    )}
  
  `<div className="sign-out">
      <button onClick={signUserOut}> Sign Out </button>
  </div>
  </>
  
  );

 
  
}

export default App;
