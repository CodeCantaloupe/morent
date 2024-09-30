import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // eslint-disable-line
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero.jsx';
import BookingForm from './components/BookingForm/BookingForm.jsx';
import PopularCars from './components/PopularCars/PopularCars.jsx';
const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {

    const token = cookies.get('jwt_token');
    (token) ? setUserLoggedIn(true) : setUserLoggedIn(false)

  }, [userLoggedIn])

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn}/>
      <Hero/>
      <BookingForm/>
      <PopularCars/>
    </>
  )
}

export default App
