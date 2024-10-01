import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // eslint-disable-line
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero.jsx';
import BookingForm from './components/BookingForm/BookingForm.jsx';
import PopularCars from './components/PopularCars/PopularCars.jsx';
import Footer from './components/Footer/Footer.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';

const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(true)

  useEffect(() => {

    const token = cookies.get('jwt_token');
    (token) ? setUserLoggedIn(true) : setUserLoggedIn(false)

  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<>
          <Navbar userLoggedIn={userLoggedIn}/>
          <Hero/>
          <BookingForm/>
          <PopularCars/>
          <Footer/>
        </>}/>

        <Route path='/register' element={<><Register/> <Footer/></>}/>
        <Route path='/login' element={<><Login/> <Footer/></>}/>
      </Routes>
    </Router>
  )  
}

export default App
