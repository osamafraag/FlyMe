import React from 'react'
import { useContext, useEffect  } from "react";
import { Token } from "../Context/Token";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  let {token, setToken} = useContext(Token)
  const navigate = useNavigate()
  useEffect(() => {
    setToken("false");
    console.log(token)
    if (token === "false") {
      navigate('/');
    }
  }, [token, setToken, navigate]);
  return (
    <div>
    </div>
  )
}