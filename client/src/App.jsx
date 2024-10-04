import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // eslint-disable-line
import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero.jsx';
import BookingForm from './components/BookingForm/BookingForm.jsx';
import PopularCars from './components/PopularCars/PopularCars.jsx';
import Footer from './components/Footer/Footer.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import UsersDashboard from './components/UsersDashboard/UsersDashboard.jsx';
import CarsDashboard from './components/CarsDashboard/CarsDashboard.jsx';
import CarDetails from './components/CarDetails/CarDetails.jsx';

const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {

    if (localStorage.getItem('isLoggedIn') === 'true') {
      setUserLoggedIn(true)
    }

  }, [userLoggedIn])

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
        <Route path='/dashboard' element={<><Navbar userLoggedIn={userLoggedIn}/> <Dashboard/> <Footer/></>}>
          <Route path='/dashboard/users' element={<UsersDashboard/>}/>
          <Route path='/dashboard/cars' element={<CarsDashboard/>}/>
        </Route>
        <Route path='/car/:id' element={<><Navbar userLoggedIn={userLoggedIn}/><CarDetails/><Footer/></>}/>
      </Routes>
    </Router>
  )  
}

export default App
