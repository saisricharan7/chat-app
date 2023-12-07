import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import Contacts  from '../components/Contacts';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")===undefined ||!localStorage.getItem("chat-app-user")){
      navigate('/login');
    }else{
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  },[]);

  useEffect(()=>{
    const getAllusers=async()=>{
        try{
          console.log(currentUser._id)
          return await axios.get(`${allUsersRoute}/${currentUser._id}`);
        }catch(e){
          throw e
        }
    }
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const data = await getAllusers();
            console.log(data)
            setContacts(data.data)
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

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contacts>
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
