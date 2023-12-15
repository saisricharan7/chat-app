import React,{useState,useEffect,useRef} from 'react';
import styled from "styled-components";
import axios from 'axios';
import { allUsersRoute,host } from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import Contacts  from '../components/Contacts';
import Welcome from '../components/Welcome';
import  ChatComponent  from '../components/ChatComponent';
import {io} from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(()=>{
    const getCurrentUser=async()=>{
      const storedUser=  localStorage.getItem("chat-app-user")
      if(storedUser===null){
        navigate('/login');
      }else{
        setCurrentUser( await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    getCurrentUser();

  },[]);

  useEffect(()=>{
    const getAllusers=async()=>{
        try{
          const allUsers=await axios.get(`${allUsersRoute}/${currentUser._id}`);
          return allUsers
        }catch(e){
          throw e
        }
    }
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const data = await getAllusers();
            setContacts(data.data);
          } catch (error) {
            navigate('/')
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };
  
    fetchData();
  },[currentUser])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contacts>
          {
            currentChat === undefined ? (
              <Welcome currentUser={currentUser}></Welcome>
            ) : (
              <ChatComponent currentChat={currentChat} currentUser={currentUser} socket={socket}></ChatComponent>
            )
          }
        </div>
      </Container>
  )
}


const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap: 1rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%
  }
}
`
export default Chat
