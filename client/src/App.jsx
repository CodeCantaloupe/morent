import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // eslint-disable-line
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {

    const token = cookies.get('jwt_token');
    (token) ? setUserLoggedIn(true) : setUserLoggedIn(false)

  }, [userLoggedIn])

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn}/>
    </>
  )
}

export default App
