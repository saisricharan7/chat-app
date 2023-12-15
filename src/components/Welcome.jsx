import React from 'react';
import styled from "styled-components";
import Robo from '../assets/robo.gif';

export default function Welcome({currentUser}) {

  return (
    <Container>
      <img src={Robo} alt='Robot'></img>
      <h1>
        welcome <span>{currentUser?.username}</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </Container>
  )
}


const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  color:white;
  img{
    height:20rem;
  }

`;
