import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./carDetails.css";
import PopularCars from '../PopularCars/PopularCars.jsx'

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState({});

    useEffect(() => {
        const getCarData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
                setCar(res.data.object);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        getCarData();
    }, [id]);

    return (
        <div className="p-5 font-plus-jakarta-sans">
            <div className="grid md:grid-cols-2 gap-5">
                {/* Left Section */}
                <div className="text-white">
                    <div className="bg-cover rounded-lg shadow-xl bg-no-repeat space-y-5 carDetailsbg p-6">
                        <h1 className="font-bold max-w-[60%]  text-lg md:text-2xl">Sports car with the best design and acceleration</h1>
                        <p className="max-w-[60%]">Safety and comfort while driving a futuristic and elegant sports car</p>
                        <img className="w-1/2 mx-auto"
                            src={"/cars/" + car.carImage}
                            alt="Car" />
                    </div>
                    {/* Preview Images */}
                    <div className="flex space-x-2 mt-12 justify-center overflow-hidden">
                        <img className="w-1/4 object-contain bg-blue-600 rounded-lg p-2" src={"/cars/" + car.carImage} alt="Preview" />
                        <img className="w-1/4" src="/View 2.svg" alt="Preview" />
                        <img className="w-1/4" src="/View 3.svg" alt="Preview" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="p-5 bg-white shadow-md rounded-lg">
                    <h2 className="font-bold text-xl">{car.carName}</h2>
                    <div className="flex mb-5">
                        <img src="/icons/review-star.svg" alt="Rating" />
                        <img src="/icons/review-star.svg" alt="Rating" />
                        <img src="/icons/review-star.svg" alt="Rating" />
                        <img src="/icons/review-star.svg" alt="Rating" />
                        <img src="/icons/review-star-empty.svg" alt="Rating" />
                        <p className="ml-5 text-sm text-slate-500">200+ Reviews</p>
                    </div>
                    <p className="text-gray-600 my-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, vero velit aut ipsam accusamus officia explicabo voluptas id ex voluptate, harum nemo molestias minus itaque quod aspernatur ratione delectus minima?</p>
                    <div className="grid grid-cols-4 gap-3 text-gray-500 text-thin">
                        <p>
                            Type Car:
                        </p>
                        <span className="text-slate-800 font-semibold">{car.carType}</span>
                        <p>
                            Capacity:
                        </p>
                        <span className="text-slate-800 font-semibold">{car.carSeats} Person(s)</span>
                        <p>
                            Steering:
                        </p>
                        <span className="text-slate-800 font-semibold capitalize">{car.carDriveType}</span>
                        <p>
                            Fuel:
                        </p>
                        <span className="text-slate-800 font-semibold">{car.carFuelCapacity}L</span>
                    </div>
                    <div className="mt-12 flex items-center">
                        <p className="text-2xl font-semibold">
                            ${car.carPrice}/
                            <span className="text-sm text-slate-400">day</span>
                        </p>
                        <button className="ml-auto bg-blue-600 text-white px-6 py-4 rounded-lg">Rent Now</button>
                    </div>
                </div>
            </div>

            <PopularCars />
        </div>

    );
};

export default CarDetails;
