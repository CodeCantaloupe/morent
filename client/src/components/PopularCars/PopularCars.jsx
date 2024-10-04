import { useState, useEffect } from "react"
import CarCard from "../CarCard/CarCard"
import axios from "axios"
import './PopularCars.css'
const PopularCars = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars")
    .then(res => {
        setCars(res.data.object)
        console.log(res.data.object)
    })
  }, [])

  return (
    <div className="m-5 whitespace-nowrap" id="popularCars">
        <div className="my-10 mx-6">
            <p className="text-slate-500 inline text-2xl font-semibold">Popular Cars</p>
            <a className="text-primaryBlue-500 inline float-end">View All</a>
        </div>
        <div className="flex space-x-4 overflow-x-scroll">
            {cars.map((car, index) => {
                let { _id, carName, carType, carPrice, carImage, carFuelCapacity, carDriveType, carSeats} = car
                
                return <CarCard key={index} carName={carName} carType={carType} carPrice={carPrice} 
                carImage={carImage} carFuel={carFuelCapacity} carDriveType={carDriveType} 
                carSeats={carSeats} carId={_id}/>;
            })}
        </div>
    </div>
  )
}

export default PopularCars