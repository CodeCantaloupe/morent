import { useState } from "react";
import propTypes from "prop-types";

const CarCard = ({carName, carType, carPrice, carImage, carFuel, carDriveType, carSeats}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="bg-white rounded-lg p-6 min-w-[340px] max-w-[300px] max-h-[400px] font-plus-jakarta-sans place-content-center overflow-y-hidden flex flex-col justify-between">
            <div>
                <p className="inline font-bold">{carName}</p>
                <div className="inline float-end">
                    <input
                        type="checkbox"
                        id={carName}
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="hidden"/>
                    <label htmlFor={carName} className="cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isChecked ? "red" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition w-6 h-6"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </label>
                </div>
            </div>
            <p className="text-slate-500">{carType}</p>
            
            <img className="my-12 mx-auto max-h-[90%]" src={"./cars/" +carImage}/>

            <div>
                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <img src="./icons/gas-station.svg" alt="" />
                        <p className="text-slate-500">{carFuel}L</p>
                    </div>
                    <div className="flex gap-1">
                        <img src="./icons/drive-type.svg" alt="" />
                        <p className="text-slate-500 capitalize">{carDriveType}</p>
                    </div>
                    <div className="flex gap-1">
                        <img src="./icons/profile-2user.svg" alt="" />
                        <p className="text-slate-500">{carSeats} People</p>
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <p className="text-2xl font-bold">${carPrice}/
                        <span className="text-lg text-slate-500"> day</span>
                    </p>
                    <button className="text-center py-3 px-5 font-semibold text-white bg-primaryBlue-500 hover:bg-primaryBlue-600 active:bg-primaryBlue-700 transition rounded">Rent Now</button>
                </div>
            </div>
        </div>
    )
}

CarCard.propTypes = {
    carName: propTypes.string.isRequired,
    carType: propTypes.string.isRequired,
    carPrice: propTypes.number.isRequired,
    carImage: propTypes.string.isRequired,
    carFuel: propTypes.number.isRequired,
    carDriveType: propTypes.string.isRequired,
    carSeats: propTypes.number.isRequired
}

export default CarCard