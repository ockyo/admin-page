import React, { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const { name } = useAuth();
  console.log(name)
  return (
    <div>
      <h1>Hi, {name}!</h1>
      <p>Welcome to my website.</p>
    </div>
  )
}

export default Home