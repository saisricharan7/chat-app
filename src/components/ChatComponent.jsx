import React from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';

export default function ChatComponent ({currentChat}) {
    const handleSendMsg=async (msg)=>{
        
    }
  return (
    <Container>
        <div className='chat-header'>
            <div className='user-details'>
                <div className='avatar'>
                    <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar"
                    />
                </div>
                <div className='username'>
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout></Logout>
        </div>
        <div className="chat-messages"></div>
        <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
    </Container>
  )
}

const Container= styled.div`
    padding-top: 1rem;
    .chat-header{
        display:flex;
        justify-content: space-between;
        align-items:center;
        padding:0.2 rem;
        .user-details{
            display:flex;
            align-items:center;
            gap:1rem;
            .avatar{
                img{
                    height:3rem;

                }
            }
            .username{
                h3{
                    color:white;

                }
            }
        }
    }
`;
