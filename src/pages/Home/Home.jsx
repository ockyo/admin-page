import React from 'react';
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const { name } = useAuth(); 
  return (
    <div>
      <h1>Hi, {name}!</h1>
      <p>Welcome to my website.</p>
    </div>
  )
}

export default Home